const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', UserController.create);

module.exports = router;