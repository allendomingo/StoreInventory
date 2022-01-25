const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * schemas:
 *   Contact:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The contact person's name.
 *       numbers:
 *         type: Array<string>
 *         description: The contact person's phone number/s.
 *       emails:
 *         type: Array<string>
 *         description: The contact person's email/s.
 *       contactType:
 *         type: string
 *         description: Whether the contact is a customer or a supplier
 */

const contactDefinition = {
	$name: 'Juan dela Cruz',
	numbers: ['0900XXXXXXX'],
	emails: ['juandelacruz@email.com'],
	$contactType: 'customer',
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
},{
    timestamps: true,
});

module.exports = {
	model: contactSchema,
	definition: contactDefinition,
};
