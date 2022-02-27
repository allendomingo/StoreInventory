const router = require('express').Router();

router.get('/', (_, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'GET users listing'
    #swagger.description = 'GET users listing'
  */
  res.send('respond with a resource');
});

module.exports = router;
