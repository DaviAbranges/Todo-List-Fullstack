import { IUsers } from "./IUser";

export interface IUserModel {
  findByEmail(email: string): Promise<IUsers | null>;
}
