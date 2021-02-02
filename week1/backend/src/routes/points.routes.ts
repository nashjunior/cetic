import { Router } from "express";
import PointsController from "../controllers/PointsController";

const pointsRouter = Router();
const pointsController = new PointsController();

pointsRouter.get("/:id", pointsController.show);
pointsRouter.post("/", pointsController.post);
pointsRouter.get("/", pointsController.index);
export default pointsRouter;
