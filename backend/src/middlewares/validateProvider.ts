import { NextFunction, Response } from "express";
import { ApiResponse } from "../types/global";
import { AuthorizedRequest } from "./authorize";

export function validateProvider() {
    return (
        req: AuthorizedRequest,
        res: Response<ApiResponse<{}>>,
        next: NextFunction
    ) => {
        const user = req.user;

        if (user!.role === "PROVIDER" || user!.role === "ADMIN") {
            next();
            return;
        }
        res.json({ ok: false, message: "Access denied", data: {} });
        return;
    };
}
