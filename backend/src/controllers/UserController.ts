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

  public async createUser(req: Request, res: Response) {
    const { username, role, email, password } = req.body;

    console.log(req.body);

    const response = await this.userService.createUser({
      username,
      role,
      email,
      password,
    });

    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
