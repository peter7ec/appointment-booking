import { Router } from "express";
import userRouter from "../user/userRoutes";
import authorize from "../middlewares/authorize";
import dayOffRouter from "../dayOff/dayOffRoutes";
import providerSvRouter from "../ProviderService/providerSvRoutes";

const apiRouter = Router();

apiRouter.use("/user", userRouter);

apiRouter.use("/service", providerSvRouter);

apiRouter.use("/dayOff", authorize, dayOffRouter);

export default apiRouter;
