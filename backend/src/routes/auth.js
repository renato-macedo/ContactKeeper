const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { User, LoginValidator } = require('../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ messsage: 'Server error' });
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', async (req, res) => {
  const { error } = LoginValidator.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  const { email, password } = req.body;

  try {
    // Search for user
    let user = await User.findOne({ email });

    // validate email
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // if all credentials are valid then return the token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ messsage: 'Server error' });
  }
  // res.json({ desc: 'Auth user & get token' });
});

module.exports = router;
