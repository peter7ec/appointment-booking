import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/global";
import { AuthorizedResponse } from "./authorize";

export function onlyAdmin() {
    return (
        req: AuthorizedResponse,
        res: Response<ApiResponse<{}>>,
        next: NextFunction
    ) => {
        const user = req.user;

        if (user!.role === "ADMIN") {
            next();
            return;
        }
        res.json({ ok: false, message: "Access denied", data: {} });
        return;
    };
}
