const { Schema, model } = require('mongoose');

const Joi = require('@hapi/joi');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const SignUpValidator = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password2: Joi.string().equal(Joi.ref('password'))
});

const LoginValidator = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(3)
    .max(30)
    .required()
});

module.exports = {
  User: model('User', UserSchema),
  SignUpValidator,
  LoginValidator
};
