const mongoose = require('mongoose')
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

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier