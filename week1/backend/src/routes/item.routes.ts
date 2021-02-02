import { Router } from "express";
import ItemsController from "../controllers/ItemsController";

const itemRouter = Router();
const itemsController = new ItemsController();

itemRouter.get("/", itemsController.index);

export default itemRouter;
