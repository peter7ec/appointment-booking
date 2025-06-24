import { Router } from "express";
import { validateProvider } from "../middlewares/validateProvider";
import authorize from "../middlewares/authorize";
import dayOffController from "./dayOffController";
import validateRequestBody from "../middlewares/validateRequestBody";
import { newDayOff } from "./dayOffSchema";

const dayOffRouter = Router();

dayOffRouter.use(validateProvider());

dayOffRouter.get("/", dayOffController.getDayOffs);

dayOffRouter.post(
    "/",
    validateRequestBody(newDayOff),
    dayOffController.createDayOff
);

dayOffRouter.delete("/:dayOffId", dayOffController.deleteDayOff);
export default dayOffRouter;
