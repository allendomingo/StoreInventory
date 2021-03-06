const mongoose = require('mongoose');

const supplierDefinition = {
  $name: 'Ben\'s Supplies',
  $address: '#1 Road St., City, Province, Philippines 0000',
  contacts: [{ $ref: '#/definitions/Contact' }],
  brands: ['BenQ', 'Corsair'],
  notes: 'Friday specials',
};

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: [String],
    required: true,
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  }],
  brands: {
    type: [String],
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = {
  model: Supplier,
  definition: supplierDefinition,
};
