const express = require('express');
const auth = require('../middleware/auth');
const ContactController = require('../controllers/Contact')

const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, ContactController.getContacts);


// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', auth, ContactController.add);


// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, ContactController.update);


// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, ContactController.delete);

module.exports = router;