const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const { ROLES } = require('../constants/roles');

const userDefinition = {
  $firstName: 'Jonel',
  $lastName: 'Babao',
  $email: 'mvp@email.com',
  $role: 'admin',
};

const User = new Schema({
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
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: 'user',
  },
});

User.plugin(passportLocalMongoose);

module.exports = {
  model: mongoose.model('User', User),
  definition: userDefinition,
};
