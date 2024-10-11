import Joi = require("joi");

// Validação de email
export const emailSchema = Joi.string()
  .email()
  .required()
  .empty()
  .label("email");

// Validação de senha
export const passwordSchema = Joi.string()
  .min(6)
  .required()
  .empty()
  .label("password");

// Validação de nome
export const nameSchema = Joi.string().min(2).required().empty().label("name");
