import { IUsers } from "../interfaces/users/IUser";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { IUserModel } from "../interfaces/users/IUserModel";
import UserModel from "../models/UserModel";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export type LoginResponseData = {
  token: string;
};
export default class UserServices {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login(
    email: string,
    password: string
  ): Promise<ServiceResponse<LoginResponseData>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return {
        status: "UNAUTHORIZED",
        data: { message: "SERVICE Invalid email or password" },
      };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return {
        status: "UNAUTHORIZED",
        data: { message: "SERVICE Invalid email or password" },
      };
    }
    const payload = { sub: user.id, role: user.role, email: user.email };
    const secret = process.env.JWT_SECRET ?? "algum secret";
    const token = jwt.sign(payload, secret, { expiresIn: "5h" });

    return { status: "SUCCESSFUL", data: { token } };
  }

  public async createUser(
    userData: Omit<IUsers, "id">
  ): Promise<ServiceResponse<IUsers>> {
    const existingUser = await this.userModel.findByEmail(userData.email);
    if (existingUser) {
      return { status: "CONFLICT", data: { message: "Email already in use" } };
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = await this.userModel.createUser({
      ...userData,
      password: hashedPassword,
    });

    return { status: "CREATED", data: newUser };
  }
}
