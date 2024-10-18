import { Router } from "express";
import userRouter from "./login.routes";
import taskRouter from "./task.routes";
const router = Router();

router.use("/", userRouter);
router.use("/tasks", taskRouter);

export default router;
