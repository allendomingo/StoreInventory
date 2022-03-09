const imports = {
  Contact: require('./contact'),
  Customer: require('./customer'),
  Supplier: require('./supplier'),
  Transaction: require('./transaction'),
  Inventory: require('./inventory'),
  User: require('./user'),
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
