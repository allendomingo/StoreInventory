const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  numbers: {
    type: [String],
    required: true
  },
  emails: {
    type: [String],
    required: true
  },
},{
    timestamps: true
})

module.exports = contactSchema
