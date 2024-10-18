import mapStatusHTTP from "../utils/mapStatusHTTP";
import TaskService from "../services/TaskService";
import { Response, NextFunction } from "express";
// import CustomRequest from "../interfaces/CustomRequest";
import { CustomRequest } from "../middlewares/auth";

export default class TaskController {
  constructor(private taskService = new TaskService()) {}

  public async getAll(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;

      const response = await this.taskService.getAll(userId);

      return res.status(mapStatusHTTP(response.status)).json(response.data);
    } catch (error) {
      next();
    }
  }

  public async create(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { id: userId } = req.user!;
      const response = await this.taskService.create(name, userId);
      res.status(mapStatusHTTP(response.status)).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      // const { id: userId } = req.user!;
      const userId = req.user?.id!;
      // console.log("controleer", id);

      const response = await this.taskService.update(
        Number(id),
        userId,
        name,
        status
      );
      res.status(mapStatusHTTP(response.status)).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id!;
      const response = await this.taskService.delete(Number(id), userId);
      res.status(mapStatusHTTP(response.status)).json(response.data);
    } catch (error) {
      next(error);
    }
  }
}
