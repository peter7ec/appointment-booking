import { Router } from "express";
import userRouter from "../user/userRoutes";
import authorize from "../middlewares/authorize";
import dayOffRouter from "../dayOff/dayOffRoutes";
import providerSvRouter from "../ProviderService/providerSvRoutes";
import providerRouter from "../Provider/providerRoutes";
import workWeekCicleRouter from "../workWeekCicle/workWeekCicleRoutes";
import appointmentRouter from "../appointment/appointmentRoutes";

const apiRouter = Router();

apiRouter.use("/user", userRouter);

apiRouter.use("/service", providerSvRouter);

apiRouter.use("/dayOff", authorize, dayOffRouter);

apiRouter.use("/provider", providerRouter);

apiRouter.use("/workcicle", authorize, workWeekCicleRouter);

apiRouter.use("/appointment", authorize, appointmentRouter);

export default apiRouter;
