import { NextFunction, Request, Response } from "express";
import { LoginUser, RegisterUser } from "./authSchemas";
import { ApiResponse, LoginUserResponseData } from "../types/global";
import authService from "./authService";
import { UserResponse } from "./authTypes";

const authController = {
    postRegister: async (
        req: Request<{}, {}, RegisterUser>,
        res: Response<ApiResponse<UserResponse>>,
        next: NextFunction
    ) => {
        try {
            const newUser = await authService.register(req.body);
            res.json({ ok: true, message: "User registered!", data: newUser });
        } catch (error) {
            next(error);
        }
    },
    postLogin: async (
        req: Request<{}, {}, LoginUser>,
        res: Response<ApiResponse<LoginUserResponseData>>,
        next: NextFunction
    ) => {
        try {
            const token = await authService.login(req.body);
            res.json({
                ok: true,
                message: "Succesfully logged in!",
                data: { token },
            });
        } catch (error) {
            next(error);
        }
    },
};

export default authController;
