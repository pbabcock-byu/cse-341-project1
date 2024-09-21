const express = require('express');
const router = express.Router();

// usersController functions (getAll and getSingle) should be found in the file /controllers/users
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

module.exports = router;