import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import LoginValidate from "../middlewares/loginMiddleware";

const router = Router();

const userController = new UserController();

router.post(
  "/login",
  LoginValidate.validateLogin,
  (req: Request, res: Response) => userController.login(req, res)
);

router.post("/create", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

export default router;
