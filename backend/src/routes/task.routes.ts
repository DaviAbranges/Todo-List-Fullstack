import { Router } from "express";
import TaskController from "../controllers/TaskController";
import AuthMiddleware from "../middlewares/auth";
const router = Router();

const taskController = new TaskController();
const authMiddleware = new AuthMiddleware();

router.get(
  "/",
  authMiddleware.auth.bind(authMiddleware),
  taskController.getAll.bind(taskController)
);

router.post(
  "/",
  authMiddleware.auth.bind(authMiddleware),
  taskController.create.bind(taskController)
);

router.put(
  "/:id",
  authMiddleware.auth.bind(authMiddleware),
  taskController.update.bind(taskController)
);

router.delete(
  "/:id",
  authMiddleware.auth.bind(authMiddleware),
  taskController.delete.bind(taskController)
);
export default router;
