const bcrypt = require('bcryptjs');
const { User, validator } = require('../models/User');

module.exports = {
    async create(req, res) {

        const { error, value } = validator.validate(req.body);

        if (error) {
            const errors = error.details.map( detail => detail.message);
            return res.status(400).json({ errors: errors });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.json({ message: 'User saved' })

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ messsage: 'Server error' });
        }
        
    },
}