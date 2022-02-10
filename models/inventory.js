const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventoryDefinition = {
	$name: 'Pan de Coco',
	manufacturer: 'All3n\'s Bakery',
	category: 'Sweet stuff',
  $quantity: 10
};

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
},{
    timestamps: true,
})

inventorySchema.index({'name': 1, 'manufacturer': 1, 'category': 1}, {unique: true});

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = {
	model: Inventory,
	definition: inventoryDefinition,
};