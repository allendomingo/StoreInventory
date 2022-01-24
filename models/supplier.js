const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * schemas:
 *   Supplier:
 *     allOf:
 *       - type: object
 *         properties:
 *           name:
 *             type: string
 *             description: The supplier's name.
 *           address:
 *             type: Array<string>
 *             description: The supplier's address/es.
 *           contacts:
 *             type: Contact
 *             description: The supplier's contact information
 *           brands:
 *             type: [string]
 *             description: The supplier's address/es.
 *           notes:
 *             type: string
 *             description: Additional notes.
 */

const supplierDefinition = {
	$name: 'Ben\'s Supplies',
	$address: '#1 Road St., City, Province, Philippines 0000',
	contacts: [{ $ref: '#/definitions/Contact' }],
	brands: ['BenQ', 'Corsair'],
	notes: 'Friday specials',
};

const supplierSchema = new Schema({
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
  }
},{
    timestamps: true,
})

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = {
	model: Supplier,
	definition: supplierDefinition,
};