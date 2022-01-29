const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerDefinition = {
	$name: 'Rahmon Rapael',
	$address: '#1 Road St., City, Province, Philippines 0001',
	contacts: [{ $ref: '#/definitions/Contact' }],
	brands: ['Shemshung'],
	notes: 'Friday discounts',
};

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

module.exports = {
  model: Customer,
  definition: customerDefinition
}