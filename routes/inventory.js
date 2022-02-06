const router = require('express').Router();

router.get('/', function(req, res) {
  /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'GET inventory listing'
   * #swagger.description = 'GET inventory listing'
   */
  res.send('respond with a resource');
});

module.exports = router;
