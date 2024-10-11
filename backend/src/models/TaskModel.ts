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

  async create(data: Omit<ITasks, "id">): Promise<ITasks> {
    const newTask = await this.model.create({
      name: data.name,
      status: data.status,
      createdAt: data.createdAt,
      userId: data.userId,
    });

    return newTask;
  }
}
