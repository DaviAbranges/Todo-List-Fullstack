import { Request, Response } from "express";
import UserServices from "../services/UserService";
import mapStatusHTTP from "../utils/mapStatusHTTP";

export default class UserController {
  constructor(private userService = new UserServices()) {}

  public async login(req: Request, res: Response) {
    const { password, email } = req.body;
    const response = await this.userService.login(email, password);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
