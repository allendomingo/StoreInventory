const mongoose = require('mongoose')
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
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }],
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