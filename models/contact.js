const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactTypes = Object.freeze({
	supplier: 'Supplier',
	customer: 'Customer',
});

const contactDefinition = {
	$name: 'Juan dela Cruz',
	numbers: ['0900XXXXXXX'],
	emails: ['juandelacruz@email.com'],
	$contactType: [ContactTypes.customer],
};

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  numbers: {
    type: [String],
  },
  emails: {
    type: [String],
  },
  // Differentiate between supplier, customer, etc.
  contactType: {
    type: [String],
		enum: Object.values(ContactTypes),
    required: true,
  }
},{
    timestamps: true,
});

Object.assign(contactSchema.statics, {
	ContactTypes,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
	model: Contact,
	definition: contactDefinition,
};
