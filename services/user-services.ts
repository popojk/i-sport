const bcrypt = require('bcryptjs');
import { Request } from 'express';
const { User, UserPlan, Collection, Store, Reservation, Class } = require('../models');
import { UserAccountData, UserInstance, SignUpData, SignInData, UserPlanInstance, StoreWithUserPlanInstance, CollectionInstance, ReservationInstance, ReservationClass } from '../interfaces/user-interface';
import sequelize from 'sequelize';
import { Op, Model } from 'sequelize';
import jwt from 'jsonwebtoken';
import { userPlanDataHelper } from '../helpers/userPlan-helpers';
import { imgurFileHandler } from '../helpers/file-helpers';
import { getUser } from '../_helpers';
import { reservationHelper } from '../helpers/reservation-helpers';
import { ReturnMessage } from '../interfaces/message-interface';

export default class UserServices {

  public signIn(
    req: Request,
    cb: (err: any, data?: SignInData) => void) {
    try {
      // get user data from rquest
      const userData = req.user.dataValues;
      // issue JWT
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
      // respond signin data
      const data: SignInData = {
        token,
        userId: userData.id,
        avatar: userData.avatar,
        role: userData.role
      };
      cb(null, data);
    } catch (err) {
      cb(err);
    }
  }

  public signUp(
    req: Request,
    cb: (err: any, data?: SignUpData) => void) {
    // get signup data from request body
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤');
    // check if email already signup
    User.findOne({
      where: { email }
    })
      .then((user: UserInstance) => {
        if (user) throw new Error('email已重複註冊');
        // if email not signup yet, encrypt the password
        return bcrypt.hash(password, 10);
      })
      .then((hash: string) => {
        // create user
        return User.create({
          email,
          password: hash,
          nickname: '匿名',
          role: 'user'
        });
      })
      .then((user: UserInstance) => {
        const userData = user.dataValues;
        delete userData.password;
        // issue JWT for user to login after signup
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
        // respond the signup data
        const data: SignUpData = {
          message: '註冊成功',
          token,
          userId: userData.id,
          avatar: userData.avatar,
          role: userData.role
        };
        cb(null, data);
      })
      .catch((err: any) => cb(err));
  }

  public getUser = (
    req: Request,
    cb: (err: any, data?: UserAccountData) => void) => {
    return User.findByPk(getUser(req).id, {
      raw: true,
      attributes: ['id', 'email', 'nickname', 'avatar']
    })
      .then((user: UserAccountData) => {
        cb(null, user);
      })
      .catch((err: any) => cb(err));
  }

  public putAccount = (
    req: Request,
    cb: (err: any, data?: ReturnMessage) => void) => {
    try {
      // get user account data
      const { email, nickname } = req.body;
      // get user avatar
      const { file } = req;
      if (!nickname) throw new Error('暱稱不可為空值');
      if (nickname.length > 50) throw new Error('暱稱名稱不可超過50字');
      // check if email already exist and not belongs to current user
      return Promise.all([
        User.findOne({ where: { email }, raw: true }),
        User.findByPk(getUser(req).id)
      ])
        .then(([emailUser, user]) => {
          if (emailUser && emailUser.email !== getUser(req).email) throw new Error('email已重複註冊');
          // if user upload avatar, update the avatar with others user data
          if (JSON.stringify(file) !== '{}' && file !== undefined) {
            return imgurFileHandler(file)
              .then(avatarFilePath => {
                return user.update({
                  email,
                  nickname,
                  avatar: avatarFilePath || user.avatar
                });
              });
          } else {
            // if user did not update the avatar, just update others user data
            return user.update({
              email,
              nickname
            });
          }
        })
        .then((updatedUser: UserInstance) => {
          cb(null, { message: '更新成功' });
        })
        .catch((err: any) => cb(err));
    } catch (err: any) {
      cb(err);
    }
  }

  public putPassword = (
    req: Request,
    cb: (err: any, data?: ReturnMessage) => void) => {
    // get user password data
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤');

    return Promise.all([
      User.findByPk(getUser(req).id),
      // encrypt the password
      bcrypt.hash(password, 10)
    ])
      .then(([user, hash]) => {
        // update the password
        return user.update({
          password: hash
        });
      })
      .then(() => {
        // return success message
        return cb(null, { message: '更新成功' });
      })
      .catch((err: any) => cb(err));
  }

  public getUserPlans = (
    req: Request,
    cb: (err: any, data?: UserPlanInstance[] | StoreWithUserPlanInstance[]) => void) => {
    const storeId = req.query.store_id;
    // if frontend set query params, get userPlans by storeId
    if (storeId !== null) {
      return UserPlan.findAll({
        where: {
          // find userplans with valid amount or still in valid date
          [Op.or]: [
            [{ user_id: getUser(req).id },
            { store_id: storeId },
            { amount_left: { [Op.gt]: 0 } }],
            [{ user_id: getUser(req).id },
            { store_id: storeId },
            { expire_date: { [Op.gt]: new Date() } }]
          ]
        },
        attributes: ['id', 'amountLeft', 'expireDate',
          [sequelize.literal('(SELECT plan_name FROM Plans WHERE Plans.id = UserPlan.plan_id)'), 'planName'],
          [sequelize.literal('(SELECT plan_type FROM Plans WHERE Plans.id = UserPlan.plan_id)'), 'planType'],
          [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = UserPlan.store_id)'), 'StoreName']
        ]
      })
        .then((userPlans: UserPlanInstance[]) => {
          if (userPlans.length === 0) throw new Error('目前無有效方案');
          const data: UserPlanInstance[] = userPlans.map(userPlan => {
            // check if userPlan is day type, if yes insert amout left
            return userPlanDataHelper(userPlan);
          });
          return cb(null, data);
        })
        .catch((err: any) => cb(err));
    } else {
      // if frontend did not set query params, get all userPlan
      return Store.findAll({
        where: [{ '$UserPlans.user_id$': getUser(req).id }],
        include: {
          model: UserPlan,
          as: 'UserPlans',
          where: {
            [Op.or]: [
              [{ amount_left: { [Op.gt]: 0 } }],
              [{ expire_date: { [Op.gt]: new Date() } }]
            ]
          },
          attributes: ['id', 'amountLeft', 'expireDate',
            [sequelize.literal('(SELECT plan_name FROM Plans WHERE Plans.id = UserPlans.plan_id)'), 'planName'],
            [sequelize.literal('(SELECT plan_type FROM Plans WHERE Plans.id = UserPlans.plan_id)'), 'planType'],
            [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = UserPlans.store_id)'), 'StoreName']
          ]
        },
        attributes: [['id', 'storeId'], 'storeName']
      })
        .then((stores: StoreWithUserPlanInstance[]) => {
          const data: StoreWithUserPlanInstance[] =
            stores.map((store: StoreWithUserPlanInstance) => {
              store.UserPlans = store.UserPlans.map((plan: UserPlanInstance) => {
                return userPlanDataHelper(plan);
              });
              return store;
            });
          return cb(null);
        })
        .catch((err: any) => cb(err));
    }
  }

  public getUserCollections = (
    req: Request,
    cb: (err: any, data?: CollectionInstance[]) => void) => {
    return Collection.findAll({
      where: { userId: getUser(req).id },
      raw: true,
      nest: true,
      include: {
        model: Store,
        attributes: ['id', 'storeName', 'photo', 'address', 'introduction',
          [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
          [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating'],
          [sequelize.literal(`EXISTS(SELECT 1 FROM Collections WHERE Collections.store_id = Store.id AND Collections.user_id = ${getUser(req).id})`), 'isLiked']
        ]
      }
    })
      .then((collections: CollectionInstance[]) => {
        if (collections.length === 0) throw new Error('沒有收藏場館');
        const data: CollectionInstance[] = collections.map(collection => {
          collection.dataValues.isLiked = collection.dataValues.isLiked === 1;
          return collection;
        });
        return cb(null, data);
      })
      .catch((err: any) => cb(err));
  }

  public getUserReservations = (
    req: Request,
    cb: (err: any, data?: ReservationClass[]) => void) => {
    return Reservation.findAll({
      where: [{ user_id: getUser(req).id },
        // only list out reservationsafter today
      { '$Class.start_date_time$': { [Op.gt]: new Date() } }],
      raw: true,
      nest: true,
      include: {
        model: Class,
        as: 'Class',
        attributes: ['date',
          [sequelize.literal('(SELECT id FROM Stores WHERE Stores.id = Class.store_id)'), 'storeId'],
          [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = Class.store_id)'), 'storeName'],
          [sequelize.literal('(SELECT class_name FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'className'],
          [sequelize.literal('(SELECT start_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'startTime'],
          [sequelize.literal('(SELECT end_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'endTime'],
          [sequelize.literal('(SELECT week_day FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'weekDay']
        ]
      },
      order: [
        [{ model: Class, as: 'Class' }, 'date', 'ASC']
      ]
    })
      .then((reservations: ReservationInstance[]) => {
        if (reservations.length === 0) throw new Error('目前無預約課程');
        const classesData: ReservationClass[] = reservations.map((reservation: ReservationInstance) => {
          // create the reservation and send to frontend
          return reservationHelper(reservation);
        });
        return cb(null, classesData);
      })
      .catch((err: any) => cb(err));
  }
}
