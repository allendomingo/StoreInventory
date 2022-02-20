const router = require('express').Router();

router.get('/', function(req, res) {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = 'GET users listing'
   * #swagger.description = 'GET users listing'
   */
  res.send('respond with a resource');
});

module.exports = router;
