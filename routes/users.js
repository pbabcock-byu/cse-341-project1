const express = require('express');
const router = express.Router();

// usersController functions (getAll and getSingle) should be found in the file /controllers/users
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;