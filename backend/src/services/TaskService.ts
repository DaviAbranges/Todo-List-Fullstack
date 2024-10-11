import TaskModel from "../models/TaskModel";
import { ITaskModel } from "../interfaces/tasks/ITaskModel";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { ITasks } from "../interfaces/tasks/ITasks";

export default class TaskService {
  constructor(private taskModel: ITaskModel = new TaskModel()) {}

  public async getAll(userId: number): Promise<ServiceResponse<ITasks[]>> {
    const tasks = await this.taskModel.findAll(userId);
    console.log("cheguei no get all");

    return { status: "SUCCESSFUL", data: tasks };
  }

  public async create(
    name: string,
    userId: number
  ): Promise<ServiceResponse<ITasks>> {
    const createdAt = new Date();
    const status = "pending";
    const newTask = await this.taskModel.create({
      name,
      status,
      createdAt,
      userId,
    });

    return { status: "SUCCESSFUL", data: newTask };
  }
}
