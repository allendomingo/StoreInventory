var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  /**
   * #swagger.tags = ['Transactions']
   * #swagger.summary = 'GET transactions listing'
   * #swagger.description = 'GET transactions listing'
   */
  res.send('respond with a resource');
});

module.exports = router;