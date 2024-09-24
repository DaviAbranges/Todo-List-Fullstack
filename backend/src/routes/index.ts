import { Router } from "express";
import userRouter from "./login.routes";
const router = Router();

router.use("/login", userRouter);

export default router;
