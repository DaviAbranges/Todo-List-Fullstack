import { Request, Response, NextFunction } from "express";
import verifyToken from "./verifyToken";
import UserServices from "../services/UserService";
import { IUsers } from "../interfaces/users/IUser";
import { ServiceMessage } from "../interfaces/ServiceResponse";

export interface CustomRequest extends Request {
  user?: IUsers;
}
export default class AuthMiddleware {
  constructor(private userService = new UserServices()) {}

  public async auth(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { authorization: token } = req.headers;

      if (!token) {
        const customError = {
          status: "NOT_FOUND",
          data: { message: "Invalid Token" },
        };
        throw customError;
      }
      const userId = verifyToken(token as string);

      const { status, data } = await this.userService.getById(Number(userId));
      if (status === "NOT_FOUND" || !data) {
        const customError = {
          status: "NOT_FOUND",
          data: { message: "User not found" },
        };
        throw customError;
      }

      if ("id" in data) {
        req.user = data; // data agora é garantido como IUsers
      } else {
        throw new Error("Invalid user data");
      }

      return next();
    } catch (error) {
      return next("ERRO NO AUTH");
    }
  }
}
