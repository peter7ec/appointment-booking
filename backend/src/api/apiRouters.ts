import { Router } from "express";
import userRouter from "../user/userRoutes";
import authorize from "../middlewares/authorize";
import dayOffRouter from "../dayOff/dayOffRoutes";

const apiRouter = Router();

apiRouter.use("/user", userRouter);

apiRouter.use(authorize);

apiRouter.use("/dayOff", dayOffRouter);

export default apiRouter;
