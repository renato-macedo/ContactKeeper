const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User, SignUpValidator } = require('../models/User');

module.exports = {
  async create(req, res) {
    // check if name, email and password has valid format
    const { error } = SignUpValidator.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    const { name, email, password } = req.body;

    try {
      // check if there is another user with the same email
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // if not then create a new user model
      user = new User({
        name,
        email,
        password
      });

      // hashing the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // save user into the database
      await user.save();

      // return user's token
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
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async show(req, res) {
    const users = await User.find();
    res.json(users);
  }
};
