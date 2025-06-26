import { Router } from "express";
import appointmentController from "./appointmentController";
import { validateProvider } from "../middlewares/validateProvider";

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
    validateProvider(),
    appointmentController.appointmentEdit
);

appointmentRouter.post(
    "/",
    validateProvider(),
    appointmentController.appointmentCreate
);

export default appointmentRouter;
