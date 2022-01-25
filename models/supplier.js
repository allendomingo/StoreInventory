const mongoose = require('mongoose')
const contactSchema = require('./contact.js')
const Schema = mongoose.Schema

const supplierSchema = new Schema({
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

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier