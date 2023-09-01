import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import { getUser } from '../_helpers';
import { imgurFileHandler } from '../helpers/file-helpers';
import { paginate } from '../helpers/paginate-helpers';
import { Request } from 'express';
import { SignInData, SignUpData, UserAccountData, UserInstance } from '../interfaces/user-interface';
import { StoreInstance } from '../interfaces/store-interface';
import { ClassScheduleInstance } from '../interfaces/class-interface';
import { WeekDays } from '../interfaces/common-interface';
import { PlanInstance } from '../interfaces/plan-interface';
import { ReviewInstance } from '../interfaces/review-interface';
const { User, Store, ClassSchedule, Plan, Review } = require('../models');

export default class OwnerServices {
  public signIn = (
    req: Request,
    cb: (err: any, data?: SignInData) => void) => {
    try {
      const userData = req.user.dataValues;
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
      const data: SignInData = {
        token,
        userId: userData.id,
        role: userData.role
      };
      cb(null, data);
    } catch (err) {
      cb(err);
    }
  }

  public signUp = (
    req: Request,
    cb: (err: any, data?: SignUpData) => void) => {
    const { email, storeName, password, confirmPassword } = req.body;
    if (!email.trim() || !storeName.trim() || !password.trim()) throw new Error('必須輸入所有欄位');
    if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤');
    if (storeName.length > 50) throw new Error('商家名稱不可超過50字');
    if (email.length > 50) throw new Error('email不可超過50字');
    if (password.length > 50) throw new Error('密碼不可超過50字');
    User.findOne({
      where: { email }
    })
      .then((user: UserInstance) => {
        if (user) throw new Error('email已重複註冊');
        return bcrypt.hash(password, 10);
      })
      .then((hash: string) => {
        return User.create({
          email,
          password: hash,
          storeName,
          role: 'owner'
        });
      })
      .then((user: UserInstance) => {
        const userData = user.dataValues;
        delete userData.password;
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
        const data: SignUpData = {
          message: '註冊成功',
          token,
          userId: userData.id,
          role: userData.role
        };
        return cb(null, data);
      })
      .catch((err: any) => cb(err));
  }

  public getOwner = (
    req: Request,
    cb: (err: any, data?: UserAccountData) => void) => {
    return User.findByPk(getUser(req).id, {
      raw: true,
      attributes: ['id', 'email', 'storeName']
    })
      .then((user: UserAccountData) => {
        cb(null, user);
      })
      .catch((err: any) => cb(err));
  }

  public putAccount = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    try {
      const { email, storeName } = req.body;
      if (email.length > 50) throw new Error('email不可超過50字');
      if (storeName.length > 50) throw new Error('商家名稱不可超過50字');
      return Promise.all([
        User.findOne({ where: { email }, raw: true }),
        User.findByPk(getUser(req).id)
      ])
        .then(([emailUser, user]) => {
          if (emailUser && emailUser.email !== getUser(req).email) throw new Error('email已重複註冊');
          return user.update({
            email,
            storeName
          });
        })
        .then((updatedUser: UserInstance) => {
          cb(null, '更新成功');
        })
        .catch((err: any) => cb(err));
    } catch (err) {
      cb(err);
    }
  }

  public putPassword = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    try {
      const { password, confirmPassword } = req.body;
      if (!password.trim()) throw new Error('密碼不可為空值');
      if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤');
      if (password.length > 50) throw new Error('密碼不可超過50字');
      return Promise.all([
        User.findByPk(getUser(req).id),
        bcrypt.hash(password, 10)
      ])
        .then(([user, hash]) => {
          user.update({
            password: hash
          });
        })
        .then(() => {
          return cb(null, '更新成功');
        })
        .catch((err: any) => cb(err));
    } catch (err) {
      cb(err);
    }
  }

  public getStores = (
    req: Request,
    cb: (err: any, data?: StoreInstance[]) => void) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    if (!page || !pageSize) throw new Error('請提供page及pageSize');
    return Store.findAll({
      where: { userId: getUser(req).id },
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction', 'lat', 'lng',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating']
      ],
      ...paginate(Number(page), Number(pageSize))
    })
      .then((stores: StoreInstance[]) => {
        if (stores.length === 0) throw new Error('沒有建立之場館');
        return cb(null, stores);
      })
      .catch((err: any) => cb(err));
  }

  public postStore = (
    req: Request,
    cb: (err: any, data?: { id: number }) => void) => {
    try {
      const { storeName, address, introduction, phone, email } = req.body;
      const { file } = req;
      if (!storeName.trim() || !address.trim() || !introduction.trim() || !phone.trim() || !email.trim() || !file) throw new Error('所有欄位必須輸入');
      if (storeName.length > 50) throw new Error('場館名稱不可超過50字元');
      if (address.length > 100) throw new Error('地址不可超過100字元');
      if (introduction.length > 300) throw new Error('場館介紹不可超過300字元');
      if (phone.length > 100) throw new Error('電話不可超過100字元');
      if (email.length > 50) throw new Error('email不可超過50字');
      return Promise.all([
        Store.findOne({ where: { storeName } }),
        Store.findOne({ where: { address } })
      ])
        .then(([nameStore, addressStore]) => {
          if (nameStore) throw new Error('場館名稱已被使用');
          if (addressStore) throw new Error('場館地址已被使用');
          return imgurFileHandler(file);
        })
        .then(photoFilePath => {
          if (!photoFilePath) throw new Error('照片上傳失敗');
          return Store.create({
            email,
            storeName,
            address,
            introduction,
            phone,
            photo: photoFilePath,
            userId: getUser(req).id
          });
        })
        .then((store: StoreInstance) => {
          return cb(null, { id: store.id });
        })
        .catch(err => cb(err));
    } catch (err) {
      cb(err);
    }
  }

  public putStore = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    try {
      const { storeName, address, introduction, phone, email } = req.body;
      const { file } = req;
      if (!storeName.trim() || !address.trim() || !introduction.trim() || !phone.trim() || !email.trim()) throw new Error('所有欄位必須輸入');
      if (storeName.length > 50) throw new Error('場館名稱不可超過50字元');
      if (address.length > 100) throw new Error('地址不可超過100字元');
      if (introduction.length > 300) throw new Error('場館介紹不可超過300字元');
      if (phone.length > 100) throw new Error('電話不可超過100字元');
      if (email.length > 50) throw new Error('email不可超過50字');
      // if owner has upload photo, then re-upload photo
      if (JSON.stringify(file) !== '{}' && file !== undefined) {
        return Promise.all([
          Store.findOne({ where: { storeName } }),
          Store.findOne({ where: { address } })
        ])
          .then(([nameStore, addressStore]) => {
            if (nameStore && Number(req.params.store_id) !== nameStore.id) throw new Error('場館名稱已被使用');
            if (addressStore && Number(req.params.store_id) !== addressStore.id) throw new Error('場館地址已被使用');
            return Promise.all([
              Store.findOne({
                where: {
                  id: req.params.store_id,
                  userId: getUser(req).id
                }
              }),
              imgurFileHandler(file)
            ]);
          })
          .then(([store, photoFilePath]) => {
            if (!store) throw new Error('場館不存在');
            if (!photoFilePath) throw new Error('照片上傳失敗');
            return store.update({
              email,
              storeName,
              address,
              introduction,
              phone,
              photo: photoFilePath
            });
          })
          .then(() => {
            return cb(null, '場館更新完成');
          })
          .catch(err => cb(err));
        // if owner did not upload photo, then update store data besides photo
      } else {
        return Promise.all([
          Store.findOne({ where: { storeName } }),
          Store.findOne({ where: { address } })
        ])
          .then(([nameStore, addressStore]) => {
            if (nameStore && Number(req.params.store_id) !== nameStore.id) throw new Error('場館名稱已被使用');
            if (addressStore && Number(req.params.store_id) !== addressStore.id) throw new Error('場館地址已被使用');
            return Store.findOne({
              where: {
                id: req.params.store_id,
                userId: getUser(req).id
              }
            });
          })
          .then((store: StoreInstance) => {
            if (!store) throw new Error('場館不存在');
            return store.update({
              email,
              storeName,
              address,
              introduction,
              phone
            });
          })
          .then(() => {
            return cb(null, '場館更新完成');
          })
          .catch(err => cb(err));
      }
    } catch (err) {
      cb(err);
    }
  }

  public getStore = (
    req: Request,
    cb: (err: any, data?: StoreInstance) => void) => {
    return Store.findOne({
      where: {
        id: req.params.store_id,
        userId: getUser(req).id
      },
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction', 'phone', 'email',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating']
      ]
    })
      .then((store: StoreInstance) => {
        if (!store) throw new Error('場館不存在');
        return cb(null, store);
      })
      .catch((err: any) => cb(err));
  }

  public deleteStore = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    return Store.findOne({
      where: {
        id: req.params.store_id,
        userId: getUser(req).id
      }
    })
      .then((store: StoreInstance) => {
        if (!store) throw new Error('場館不存在');
        return store.destroy();
      })
      .then(() => {
        return cb(null, '場館已刪除');
      })
      .catch((err: any) => cb(err));
  }

  public getClassSchedules = (
    req: Request,
    cb: (err: any, data?: ClassScheduleInstance[]) => void) => {
    return ClassSchedule.findAll({
      where: [{ store_id: req.params.store_id },
      { '$Store.user_id$': getUser(req).id }],
      raw: true,
      nest: true,
      include: {
        model: Store,
        as: 'Store'
      },
      order: [['week_day', 'ASC'], ['startTime', 'ASC']],
      attributes: ['id', 'weekDay', 'className', 'startTime', 'endTime', 'headcount']
    })
      .then((schedules: ClassScheduleInstance[]) => {
        if (schedules.length === 0) throw new Error('場館無課表');
        const data = schedules.map(schedule => {
          delete schedule.Store;
          return schedule;
        });
        return cb(null, data);
      })
      .catch((err: any) => cb(err));
  }

  public postClassSchedules = (
    req: Request,
    cb: (err: any, data?: { id?: number }) => void) => {
    const { weekDay, className, headcount, startTime, endTime } = req.body;
    if (!weekDay || !className || !headcount || !startTime || !endTime) throw new Error('所有欄位必須輸入');
    if (className.length > 50) throw new Error('課程名稱不可超過50字元');
    const weekDays: WeekDays = {
      星期日: 0,
      星期一: 1,
      星期二: 2,
      星期三: 3,
      星期四: 4,
      星期五: 5,
      星期六: 6
    };
    return ClassSchedule.create({
      weekDay: weekDays[weekDay],
      className,
      headcount,
      startTime,
      endTime,
      storeId: req.params.store_id
    })
      .then((schedule: ClassScheduleInstance) => {
        cb(null, { id: schedule.id });
      })
      .catch((err: any) => cb(err));
  }

  public putClassSchedule = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    const { weekDay, className, headcount, startTime, endTime } = req.body;
    if (!weekDay || !className || !headcount || !startTime || !endTime) throw new Error('所有欄位必須輸入');
    if (className.length > 50) throw new Error('課程名稱不可超過50字元');
    const weekDays: WeekDays = {
      星期日: 0,
      星期一: 1,
      星期二: 2,
      星期三: 3,
      星期四: 4,
      星期五: 5,
      星期六: 6
    };
    return ClassSchedule.findOne({
      where: [{ id: req.params.schedule_id },
      { '$Store.user_id$': getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then((schedule: ClassScheduleInstance) => {
        if (!schedule) throw new Error('課表不存在');
        return schedule.update({
          weekDay: weekDays[weekDay],
          className,
          headcount,
          startTime,
          endTime,
          storeId: req.params.store_id
        });
      })
      .then(() => {
        return cb(null, '更新成功');
      })
      .catch((err: any) => cb(err));
  }

  public deleteClassSchedule = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    return ClassSchedule.findOne({
      where: [{ id: req.params.schedule_id },
      { '$Store.user_id$': getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then((schedule: ClassScheduleInstance) => {
        if (!schedule) throw new Error('課表不存在');
        return schedule.destroy();
      })
      .then(() => {
        return cb(null, '課表刪除成功');
      })
      .catch((err: any) => cb(err));
  }

  public getStorePlans = (
    req: Request,
    cb: (err: any, data?: PlanInstance[]) => void) => {
    return Plan.findAll({
      where: [{ store_id: req.params.store_id },
      { '$Store.user_id$': getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      },
      attributes: ['id', 'planName', 'planAmount', 'price', 'planType'],
      order: [['price', 'ASC']],
      raw: true,
      nest: true
    })
      .then((plans: PlanInstance[]) => {
        if (plans.length === 0) throw new Error('場館無方案');
        const data: PlanInstance[] = plans.map(plan => {
          delete plan.Store;
          return plan;
        });
        return cb(null, data);
      })
      .catch((err: any) => cb(err));
  }

  public postStorePlans = (
    req: Request,
    cb: (err: any, data?: { id?: number }) => void) => {
    const { planName, planType, planAmount, price } = req.body;
    if (!planName || !planType || !planAmount || !price) throw new Error('所有欄位必須輸入');
    if (planName.length > 50) throw new Error('方案名稱不可超過50字元');
    return Plan.create({
      planName,
      planType,
      planAmount,
      price,
      storeId: req.params.store_id
    })
      .then((plan: PlanInstance) => {
        return cb(null, { id: plan.id });
      })
      .catch((err: any) => cb(err));
  }

  public putStorePlan = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    const { planName, planType, planAmount, price } = req.body;
    if (!planName || !planType || !planAmount || !price) throw new Error('所有欄位必須輸入');
    if (planName.length > 50) throw new Error('方案名稱不可超過50字元');
    return Plan.findOne({
      where: [{ id: req.params.plan_id },
      { '$Store.user_id$': getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then((plan: PlanInstance) => {
        if (!plan) throw new Error('方案不存在');
        return plan.update({
          planName,
          planType,
          planAmount,
          price
        });
      })
      .then(() => {
        return cb(null, '方案更新成功');
      })
      .catch((err: any) => cb(err));
  }

  public deleteStorePlan = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    return Plan.findOne({
      where: [{ id: req.params.plan_id },
      { '$Store.user_id$': getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then((plan: PlanInstance) => {
        if (!plan) throw new Error('方案不存在');
        return plan.destroy();
      })
      .then(() => {
        return cb(null, '方案刪除成功');
      })
      .catch((err: any) => cb(err));
  }

  public getStoreReviews = (
    req: Request,
    cb: (err: any, data?: ReviewInstance[]) => void) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    if (!page || !pageSize) throw new Error('請提供page及pageSize');
    return Review.findAll({
      where: [{ store_id: req.params.store_id },
      { '$Store.user_id$': getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      },
      attributes: ['id', 'createdAt', 'rating', 'content',
        [sequelize.literal('(SELECT avatar FROM Users WHERE Users.id = Review.user_id)'), 'avatar'],
        [sequelize.literal('(SELECT nickname FROM Users WHERE Users.id = Review.user_id)'), 'nickname']
      ],
      order: [['id', 'DESC']],
      raw: true,
      nest: true,
      ...paginate(Number(page), Number(pageSize))
    })
      .then((reviews: ReviewInstance[]) => {
        if (reviews.length === 0) throw new Error('商家無評價');
        const data: ReviewInstance[] = reviews.map(review => {
          delete review.Store;
          review.createdAt = `${review.createdAt.getFullYear()}-${review.createdAt.getMonth() + 1}-${review.createdAt.getDate()}`;
          return review;
        });
        return cb(null, data);
      })
      .catch((err: any) => cb(err));
  }
}
