const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },

  type: {
    type: String,
    default: 'personal'
  }
  
}, {
  timestamps: true,
});

const Validator = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().max(20),
  type: Joi.string().max(30)
});

module.exports = {
  Contact: mongoose.model('contact', ContactSchema),
  Validator
};