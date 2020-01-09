const { Contact, Validator } = require('../models/Contact');
const { User } = require('../models/User');

module.exports = {
  async getContacts(req, res) {
    try {
      const contacts = await Contact.find({ user: req.user.id }).sort({
        createdAt: -1
      });
      return res.json(contacts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  async add(req, res) {
    const { error } = Validator.validate(req.body);

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
    const { name, email, phone, type } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({ error: 'Contact not found' });

      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: contactFields },
        { new: true }
      );

      return res.json(contact);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  },

  async delete(req, res) {
    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({ error: 'Contact not found' });

      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      await Contact.findByIdAndRemove(req.params.id);

      return res.json({ msg: 'Contact removed' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
};
