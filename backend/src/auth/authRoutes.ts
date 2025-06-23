import { Router } from "express";
import validateRequestBody from "../middlewares/validateRequestBody";
import { loginUserSchema, registerUserSchema } from "./authSchemas";
import authController from "./authController";

const authRouter = Router();

authRouter.post(
    "/register",
    validateRequestBody(registerUserSchema),
    authController.postRegister
);
authRouter.post(
    "/login",
    validateRequestBody(loginUserSchema),
    authController.postLogin
);

export default authRouter;
