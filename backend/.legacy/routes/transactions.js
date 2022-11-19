const router = require('express').Router();

router.get('/', (_, res) => {
  /*
    #swagger.tags = ['Transactions']
    #swagger.summary = 'GET transactions listing'
    #swagger.description = 'GET transactions listing'
  */
  res.send('respond with a resource');
});

module.exports = router;
