const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { ROLES } = require('../constants/roles');

const userDefinition = {
  $firstName: 'Jonel',
  $lastName: 'Babao',
  $email: 'mvp@email.com',
  $role: 'admin',
};

const User = new mongoose.Schema({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    required: true,
    default: 'user',
  },
});

User.plugin(passportLocalMongoose);

module.exports = {
  model: User,
  definition: userDefinition,
};
