import { IUsers } from "../interfaces/users/IUser";
import { IUserModel } from "../interfaces/users/IUserModel";
import SequelizeUser from "../database/models/SequelizeUser";

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUsers[]> {
    const data = await this.model.findAll();
    return data;
  }

  async findByEmail(email: string): Promise<IUsers | null> {
    const [dbData] = await this.model.findAll({ where: { email } });
    if (!dbData) return null;
    return dbData;
  }

  async createUser(userData: Omit<IUsers, "id">): Promise<IUsers> {
    const newUser = await this.model.create(userData);
    return newUser;
  }

  async findById(id: number): Promise<IUsers | null> {
    const dbData = await this.model.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });

    if (!dbData) return null;
    return dbData;
  }
}
