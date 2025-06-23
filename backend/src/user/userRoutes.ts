import { Router } from "express";
import userController from "./userController";
import authorize from "../middlewares/authorize";
import { validateAdmin } from "../middlewares/validateAdmin";
import validateRequestBody from "../middlewares/validateRequestBody";
import { editUserData, registerUserSchema } from "./userSchema";

const userRouter = Router();

userRouter.get("/", authorize, validateAdmin(), userController.getAll);
userRouter.get("/:userId", authorize, validateAdmin(), userController.getById);
userRouter.patch("/password", authorize, userController.updatePassword);
userRouter.post(
    "/",
    authorize,
    validateRequestBody(registerUserSchema),
    userController.postNewUser
);
userRouter.patch(
    "/:userId",
    authorize,
    validateAdmin(),
    validateRequestBody(editUserData),
    userController.updateUser
);
userRouter.delete(
    "/:userId",
    authorize,
    validateAdmin(),
    userController.deletUser
);

export default userRouter;
