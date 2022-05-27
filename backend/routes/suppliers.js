const router = require('express').Router();
const supplierController = require('../controllers/supplierController');

router.get('/', (_, res, next) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'GET suppliers listing'
    #swagger.description = 'Get the whole list of suppliers'
  */
  supplierController.getSuppliers()
    .then((suppliers) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(suppliers);
    })
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'POST supplier'
    #swagger.description = 'Add a supplier.
      By default, this expects the contacts to be using their objectId's,
      but the actual contact schema form can also be used.'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Supplier object',
      schema: { $ref: '#/definitions/Supplier' }
    }
  */
  supplierController.createSupplier(req.body)
    .then((supplier) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(supplier);
    })
    .catch((err) => next(err));
});

router.put('/', (_, res) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'PUT supplier'
    #swagger.description = 'Operation forbidden'
  */

  res.statusCode = 403;
  res.end('PUT operation not supported on /suppliers');
});

router.delete('/', (_, res, next) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'DELETE suppliers listing'
    #swagger.description = 'Delete all suppliers.
      Contacts will not be deleted.'
  */
  supplierController.deleteSuppliers()
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(resp);
    })
    .catch((err) => next(err));
});

router.get('/:supplierId', (req, res, next) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'GET specified supplier'
    #swagger.description = 'Get a specified supplier based on id'
  */
  supplierController.getSupplier(req.params.supplierId)
    .then((supplier) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(supplier);
    })
    .catch((err) => next(err));
});

router.post('/:supplierId', (req, res) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'POST specified supplier'
    #swagger.description = 'Operation forbidden'
  */
  res.statusCode = 403;
  res.end(`POST operation not supported on /suppliers/${req.params.supplierId}`);
});

router.put('/:supplierId', (req, res, next) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'PUT specified supplier'
    #swagger.description = 'Update specified supplier with new values'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Supplier object',
      schema: { $ref: '#/definitions/Supplier' }
    }
  */
  supplierController.updateSupplier(req.params.supplierId, req.body)
    .then((updatedSupplier) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(updatedSupplier);
    })
    .catch((err) => next(err));
});

router.delete('/:supplierId', (req, res, next) => {
  /*
    #swagger.tags = ['Suppliers']
    #swagger.summary = 'DELETE specified supplier'
    #swagger.description = 'Delete a specified supplier based on id'
  */
  supplierController.deleteSupplier(req.params.supplierId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = router;
