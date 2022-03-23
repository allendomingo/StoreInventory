/* eslint-disable camelcase */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('./models/user').model;

const config = require('./constants/serverConfig');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => jwt.sign(
  user,
  config.secretKey,
  { expiresIn: 3600 },
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(
  opts,
  (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
  },
));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyRoles = (roles) => (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (roles.indexOf(user.role) >= 0) next();
      else {
        const err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        next(err);
      }
    });
};
