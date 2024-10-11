import { IUsers } from "./users/IUser";

export default interface CustomRequest extends Request {
  user?: IUsers;
}
