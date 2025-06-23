import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import userService from "./userService";
import { ApiResponse } from "../types/global";
import { UserNoPw } from "./userTypes";
import { json } from "stream/consumers";
import { RegisterUser } from "./userSchema";
import { AuthorizedResponse } from "../middlewares/authorize";

const userController = {
    getAll: async (
        req: Request,
        res: Response<ApiResponse<UserNoPw[]>>,
        next: NextFunction
    ) => {
        try {
            const allUser = await userService.getAllUser();
            res.json({
                ok: true,
                message: "All users",
                data: allUser,
            });
        } catch (error) {
            next(error);
        }
    },
    getById: async (
        req: Request,
        res: Response<ApiResponse<UserNoPw>>,
        next: NextFunction
    ) => {
        try {
            const userById = await userService.getUserById(req.params.userId);
            res.json({
                ok: true,
                message: "User data readed!",
                data: userById,
            });
        } catch (error) {
            next(error);
        }
    },
    updatePassword: async (
        req: AuthorizedResponse,
        res: Response<ApiResponse<UserNoPw>>,
        next: NextFunction
    ) => {
        try {
            const updatedPw = await userService.updatePassword(
                req.user!.id,
                req.body.password
            );
            res.json({
                ok: true,
                message: "User password changed!",
                data: updatedPw,
            });
        } catch (error) {
            next(error);
        }
    },

    postNewUser: async (
        req: Request<{}, {}, RegisterUser>,
        res: Response<ApiResponse<Omit<User, "password">>>,
        next: NextFunction
    ) => {
        try {
            const newUser = await userService.registerUser(req.body);
            res.json({ ok: true, message: "User registered!", data: newUser });
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (
        req: Request,
        res: Response<ApiResponse<UserNoPw>>,
        next: NextFunction
    ) => {
        try {
            const updatedUser = await userService.updateUserData(
                req.params.userId,
                req.body
            );
            res.json({
                ok: true,
                message: "User data updated!",
                data: updatedUser,
            });
        } catch (error) {
            next(error);
        }
    },

    deletUser: async (
        req: Request,
        res: Response<ApiResponse<UserNoPw>>,
        next: NextFunction
    ) => {
        try {
            const deletedUser = await userService.deleteUser(req.params.userId);
            res.json({
                ok: true,
                message: "User deleted",
                data: deletedUser,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
