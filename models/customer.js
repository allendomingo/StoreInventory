const mongoose = require('mongoose')
const contactSchema = require('./contact.js')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: [String],
    required: true
  },
  contacts: {
    type: [contactSchema],
    required: true
  },
  brands: {
    type: [String],
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
},{
    timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer