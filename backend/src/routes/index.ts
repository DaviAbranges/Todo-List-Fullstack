import { Router } from "express";
import userRouter from "./login.routes";
const router = Router();

router.use("/", userRouter);

export default router;
