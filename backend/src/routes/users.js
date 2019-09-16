const express = require('express');

const UserController = require('../controllers/User');
const router = express.Router();

// @route   GET api/users
// @desc    get all users
// @access  Public
router.get('/', UserController.show);

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', UserController.create);

module.exports = router;