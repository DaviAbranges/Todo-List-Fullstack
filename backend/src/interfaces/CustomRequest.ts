import { IUsers } from "./users/IUser";

export interface CustomRequest extends Request {
  user?: IUsers;
}
