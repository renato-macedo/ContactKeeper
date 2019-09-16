const { Contact, Validator } = require('../models/Contact');
const { User } = require('../models/User');



module.exports = {
  async getContacts(req, res) {
    try {
      const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
      return res.json(contacts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  async add(req, res) {
    const { error } = Validator.validate(req.body)
    
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      return res.json(contact);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  },

  async update(req, res) {
    try {
      await Contact.findByIdAndUpdate(req.params.id, req.body)
      return res.json({ msg: "contact updated"})
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  },

  async delete(req, res) {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      return res.json({ msg: "contact deleted"})
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
}