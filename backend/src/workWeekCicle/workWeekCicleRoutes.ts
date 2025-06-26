import { Router } from "express";
import validateRequestBody from "../middlewares/validateRequestBody";
import {
    editWorkWeekCicle,
    getWorkTimeForDaySchema,
    newWorkWeekCicle,
} from "./workWeekCicleSchema";
import workWeekCircleController from "./workWeekCicleController";
import authorize from "../middlewares/authorize";

const workWeekCicleRouter = Router();

workWeekCicleRouter.get(
    "/:providerId/day",
    validateRequestBody(getWorkTimeForDaySchema),
    workWeekCircleController.allWorkTimeForDay
);

workWeekCicleRouter.get("/:providerId", workWeekCircleController.workTimeById);

workWeekCicleRouter.post(
    "/",
    authorize,
    validateRequestBody(newWorkWeekCicle),
    workWeekCircleController.createWorkTime
);

workWeekCicleRouter.patch(
    "/:workCicleId",
    authorize,
    validateRequestBody(editWorkWeekCicle),
    workWeekCircleController.editWorkTime
);

workWeekCicleRouter.delete(
    "/:workCicleId",
    authorize,
    workWeekCircleController.deleteWorkTime
);

export default workWeekCicleRouter;
