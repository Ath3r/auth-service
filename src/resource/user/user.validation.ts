import Joi from 'joi';

export const createUserValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const UpdateUserDTO = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const UpdatePasswordDTO = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
