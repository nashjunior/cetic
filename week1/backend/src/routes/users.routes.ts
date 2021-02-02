import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get("/users", usersController.getUsers);

export default usersRouter;
