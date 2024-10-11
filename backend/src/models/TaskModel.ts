import { ITaskModel } from "../interfaces/tasks/ITaskModel";
import SequelizeTask from "../database/models/SequelizeTask";
import { ITasks } from "../interfaces/tasks/ITasks";

export default class TaskModel implements ITaskModel {
  private model = SequelizeTask;

  async findAll(userId: number): Promise<ITasks[]> {
    const data = await this.model.findAll({
      where: { userId }, // Ajustar para user_id
    });
    return data;
  }
}
