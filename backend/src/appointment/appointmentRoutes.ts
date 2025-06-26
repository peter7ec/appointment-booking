import { Router } from "express";
import appointmentController from "./appointmentController";
import { validateProvider } from "../middlewares/validateProvider";
import validateRequestBody from "../middlewares/validateRequestBody";
import { editAppointment, newAppointment } from "./appointmentSchema";

const appointmentRouter = Router();

appointmentRouter.get("/", appointmentController.allAppointment);

appointmentRouter.get(
    "/:providerId/provider",
    appointmentController.appointmentByProvider
);

appointmentRouter.get(
    "/:appointmentId",
    validateProvider(),
    appointmentController.appointmentById
);

appointmentRouter.get(
    "/myappointment",
    appointmentController.appointmentByClient
);

appointmentRouter.delete(
    "/:appointmentId",
    validateProvider(),
    appointmentController.appointmentDelete
);

appointmentRouter.patch(
    "/:appointmentId",
    validateRequestBody(editAppointment),
    validateProvider(),
    appointmentController.appointmentEdit
);

appointmentRouter.post(
    "/",
    validateRequestBody(newAppointment),
    appointmentController.appointmentCreate
);

export default appointmentRouter;
