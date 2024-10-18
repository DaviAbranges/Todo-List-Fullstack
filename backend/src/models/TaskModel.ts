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

  async findById(id: number, userId: number): Promise<ITasks | null> {
    const dbData = await this.model.findOne({
      where: { id, userId },
    });

    if (!dbData) return null;
    return dbData;
  }

  async update(
    data: { name: string; status: string },
    id: number,
    userId: number
  ): Promise<ITasks | null> {
    const [affectedCount, affectedRows] = await this.model.update(data, {
      where: { id, userId },
      returning: true,
    });

    if (affectedCount === 0) return null;
    return affectedRows[0];
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.model.destroy({ where: { id, userId } });
  }
}
