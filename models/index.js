const imports = {
	Contact: require('./contact.js'),
	Supplier: require('./supplier.js'),
	User: require('./user.js'),
	Inventory: require('./inventory.js')
};

const models = {};
const definitions = {};
Object.entries(imports).forEach(([key, value]) => {
	models[key] = value.model;
	definitions[key] = value.definition;
});

module.exports = {
	models,
	definitions,
};