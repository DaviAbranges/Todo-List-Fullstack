import TaskModel from "../models/TaskModel";
import { ITaskModel } from "../interfaces/tasks/ITaskModel";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { ITasks } from "../interfaces/tasks/ITasks";

export default class TaskService {
  constructor(private taskModel: ITaskModel = new TaskModel()) {}

  public async getAll(userId: number): Promise<ServiceResponse<ITasks[]>> {
    const tasks = await this.taskModel.findAll(userId);
    // console.log("cheguei no get all");

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

  public async getById(
    id: number,
    userId: number
  ): Promise<ServiceResponse<ITasks>> {
    const user = await this.taskModel.findById(id, userId);
    // console.log("resultado getbyid", user);

    if (!user) {
      return { status: "NOT_FOUND", data: { message: "Task nosdat found" } };
    }

    return { status: "SUCCESSFUL", data: user };
  }

  public async update(
    id: number,
    userId: number,
    name: string,
    status: string
  ): Promise<ServiceResponse<ITasks>> {
    const task = await this.taskModel.findById(id, userId);
    if (!task) {
      return { status: "NOT_FOUND", data: { message: "Task not found" } };
    }

    const updatedTask = await this.taskModel.update(
      { name, status },
      id,
      userId
    );
    return { status: "SUCCESSFUL", data: updatedTask! };
  }

  public async delete(
    id: number,
    userId: number
  ): Promise<ServiceResponse<{ message: string }>> {
    const task = await this.taskModel.findById(id, userId);
    if (!task) {
      return { status: "NOT_FOUND", data: { message: "Task not found" } };
    }

    await this.taskModel.delete(id, userId);
    return {
      status: "SUCCESSFUL",
      data: { message: "Task deleted successfully" },
    };
  }
}
