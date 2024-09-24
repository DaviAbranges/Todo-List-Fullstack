import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import LoginValidate from "../middlewares/loginMiddleware";

const router = Router();

const userController = new UserController();

router.post("/", LoginValidate.validateLogin, (req: Request, res: Response) =>
  userController.login(req, res)
);

export default router;
