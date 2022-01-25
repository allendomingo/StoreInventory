var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'GET suppliers listing'
   * #swagger.description = 'GET suppliers listing'
   */
  res.send('respond with a resource');
});

module.exports = router;
