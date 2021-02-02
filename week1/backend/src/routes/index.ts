import { Router } from "express";
import itemRouter from "./item.routes";
import pointsRouter from "./points.routes";

const routes = Router();

routes.use("/points", pointsRouter);
routes.use("/items", itemRouter);

export default routes;
