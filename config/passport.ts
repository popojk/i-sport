import passport from 'passport';
import { UserInstance } from '../interfaces/user-interface';
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email: string, password: string, cb: any) => {
    User.findOne({
      where: { email }
    })
      .then((user: UserInstance) => {
        if (!user) return cb(Error('帳號不存在'), false);
        bcrypt.compare(password, user.dataValues.password)
        .then((res: any) => {
          if (!res) return cb(Error('密碼錯誤'), false);
          return cb(null, user);
        });
      })
      .catch((err: any) => cb(err));
  }
));
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
passport.use(new JWTStrategy(jwtOptions, (jwtPayload: any, cb: any) => {
  User.findByPk(jwtPayload.id)
    .then((user: UserInstance) => cb(null, user))
    .catch((err: any) => cb(err));
}));

module.exports = passport;
