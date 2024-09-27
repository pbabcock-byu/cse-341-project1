
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World, This is home router');
  });


// here it see the url /uses and so that will look for the required which is users.js  
router.use('/users', require('./users'));



module.exports = router;