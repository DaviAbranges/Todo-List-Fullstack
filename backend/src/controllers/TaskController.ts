import mapStatusHTTP from "../utils/mapStatusHTTP";
import TaskService from "../services/TaskService";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../middlewares/auth";

export default class TaskController {
  constructor(private taskService = new TaskService()) {}

  public async getAll(req: CustomRequest, res: Response, next: NextFunction) {
    // try {
    const { id: userId } = req.user!; // Use o operador de asserção se necessário
    console.log("controllerr", userId);

    const response = await this.taskService.getAll(userId);
    console.log("heheheh", response);

    return res.status(mapStatusHTTP(response.status)).json(response.data);
    // } //catch (error) {
    //   next("jhsauhdua");
    // }
  }
}
