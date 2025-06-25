import { Router } from "express";
import userRouter from "../user/userRoutes";
import authorize from "../middlewares/authorize";
import dayOffRouter from "../dayOff/dayOffRoutes";
import providerSvRouter from "../ProviderService/providerSvRoutes";
import providerRouter from "../Provider/providerRoutes";

const apiRouter = Router();

apiRouter.use("/user", userRouter);

apiRouter.use("/service", providerSvRouter);

apiRouter.use("/dayOff", authorize, dayOffRouter);

apiRouter.use("/provider", providerRouter);

export default apiRouter;
