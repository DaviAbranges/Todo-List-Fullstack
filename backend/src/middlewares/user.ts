import { NextFunction, Request, Response } from "express";
import { emailSchema, nameSchema, passwordSchema } from "../schemas/user";

const validateEmail = (req: Request, _res: Response, next: NextFunction) => {
  const { email } = req.body;
  const { error } = emailSchema.validate(email);

  if (error) return next(error);

  return next();
};

const validatePassword = (req: Request, _res: Response, next: NextFunction) => {
  const { password } = req.body;
  const { error } = passwordSchema.validate(password);

  if (error) return next(error);

  return next();
};

const validateName = (req: Request, _res: Response, next: NextFunction) => {
  const { name } = req.body;
  const { error } = nameSchema.validate(name);

  if (error) return next(error);

  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
