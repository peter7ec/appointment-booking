import { Router } from "express";
import providerController from "./providerController";
import authorize from "../middlewares/authorize";
import { validateProvider } from "../middlewares/validateProvider";
import { validateAdmin } from "../middlewares/validateAdmin";

const providerRouter = Router();

providerRouter.get("/", providerController.allProvider);

providerRouter.get("/:providerId", providerController.providerById);

providerRouter.post(
    "/:userId",
    authorize,
    validateAdmin(),
    providerController.createProvider
);

providerRouter.delete(
    "/:providerId",
    authorize,
    validateAdmin(),
    providerController.deleteProvider
);

export default providerRouter;
