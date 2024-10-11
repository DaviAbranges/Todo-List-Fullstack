import { Router, Request, Response, NextFunction } from "express";
import TaskController from "../controllers/TaskController";
import AuthMiddleware from "../middlewares/auth";
import { CustomRequest } from "../interfaces/CustomRequest";

const router = Router();

const taskController = new TaskController();
const authMiddleware = new AuthMiddleware();

router.get(
  "/tasks",
  authMiddleware.auth.bind(authMiddleware),
  taskController.getAll.bind(taskController)
);

export default router;
