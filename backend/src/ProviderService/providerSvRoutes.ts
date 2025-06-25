import { Router } from "express";
import providerSvController from "./providerSvController";
import { validateProvider } from "../middlewares/validateProvider";
import validateRequestBody from "../middlewares/validateRequestBody";
import { editPService, newPService } from "./providerSvSchema";
import authorize from "../middlewares/authorize";

const providerSvRouter = Router();

providerSvRouter.get("/", providerSvController.getAllService);

providerSvRouter.get(
    "/:providerId",
    providerSvController.getServiceByProviderId
);

providerSvRouter.delete(
    "/:serviceId",
    authorize,
    validateProvider(),
    providerSvController.deleteService
);

providerSvRouter.patch(
    "/:serviceId/edit",
    authorize,
    validateProvider(),
    validateRequestBody(editPService),
    providerSvController.editService
);

providerSvRouter.post(
    "/",
    authorize,
    validateProvider(),
    validateRequestBody(newPService),
    providerSvController.createService
);

export default providerSvRouter;
