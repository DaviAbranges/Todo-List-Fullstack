import { NextFunction, Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";

export default class LoginValidate {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(mapStatusHTTP("UNAUTHORIZED"))
        .json({ message: "MIDDLEWARE Invalid email or password" });
    }

    if (password.length < 6) {
      return res
        .status(mapStatusHTTP("UNAUTHORIZED"))
        .json({ message: "MIDDLEWARE Invalid email or password" });
    }
    next();
  }
}
