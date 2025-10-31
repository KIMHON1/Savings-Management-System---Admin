import Joi from 'joi';

export const adminRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
