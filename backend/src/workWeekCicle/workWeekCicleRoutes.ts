import { Router } from "express";
import validateRequestBody from "../middlewares/validateRequestBody";
import {
    editWorkWeekCicle,
    getWorkTimeForDaySchema,
    newWorkWeekCicle,
} from "./workWeekCicleSchema";
import workWeekCircleController from "./workWeekCicleController";
import authorize from "../middlewares/authorize";
import { validateAdmin } from "../middlewares/validateAdmin";

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
    validateAdmin(),
    validateRequestBody(newWorkWeekCicle),
    workWeekCircleController.createWorkTime
);

workWeekCicleRouter.patch(
    "/:workCicleId",
    authorize,
    validateAdmin(),
    validateRequestBody(editWorkWeekCicle),
    workWeekCircleController.editWorkTime
);

workWeekCicleRouter.delete(
    "/:workCicleId",
    authorize,
    validateAdmin(),
    workWeekCircleController.deleteWorkTime
);

export default workWeekCicleRouter;
