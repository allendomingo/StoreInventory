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
  }
},{
    timestamps: true
})

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