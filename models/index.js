const imports = {
  Contact: require('./contact'),
  Supplier: require('./supplier'),
  Transaction: require('./transaction'),
  Inventory: require('./inventory'),
  User: require('./user'),
};

const models = {};
const definitions = {
	TransactionInputDTO: require('./transaction.js').transactionInputDTO,
};

Object.entries(imports).forEach(([key, value]) => {
  models[key] = value.model;
  definitions[key] = value.definition;
});

module.exports = {
  models,
  definitions,
};
