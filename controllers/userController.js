/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const passport = require('passport');
const User = require('../models/user').model;
const authenticate = require('../authenticate');

const { ROLES } = require('../constants/roles');

exports.getUsers = (params) => User.find(params);

exports.getUser = (userId) => User.findById(userId);

exports.registerUser = (req, res) => {
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,

    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err });
      } else {
        if (req.body.firstName) {
          user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          user.lastName = req.body.lastName;
        }
        if (req.body.role) {
          user.role = req.body.role;
        }
        user.save((err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful' });
          });
        });
      }
    },
  );
};

exports.loginUser = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }
    // eslint-disable-next-line no-shadow
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!' });
      }

      const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', token);
      res.json({ success: true, status: 'Login Successful!', token });
    });
  })(req, res, next);
};

exports.updateUser = async (userId, updateParams) => {
  const user = await User.findById(userId);

  if (user.role === ROLES.admin) {
    return new Error('Admin cannot be updated');
  }
  return User.findByIdAndUpdate(
    userId,
    { $set: updateParams },
    { new: true },
  );
};

exports.deleteUsers = (ids) => {
  // Delete all users that aren't admin
  // This also accepts array of user ids

  if (ids) return User.deleteMany({ role: { $ne: ROLES.admin }, _id: ids });
  return User.deleteMany({ role: { $ne: ROLES.admin } });
};

exports.deleteUser = async (userId) => {
  const user = await User.findById(userId);

  if (user.role === ROLES.admin) {
    return new Error('Admin cannot be deleted');
  }
  return User.findByIdAndRemove(userId);
};
