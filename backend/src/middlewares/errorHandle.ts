import { ApiResponse } from "../types/global";
import { Response, Request, NextFunction } from "express";
import HttpError from "../utils/HttpError";

export default function errorHandler(
    error: HttpError,
    req: Request,
    res: Response<ApiResponse<{}>>,
    next: NextFunction
) {
    console.log(error);
    res.status(error.statusCode).json({
        ok: false,
        message: error.message ?? "Internal server error",
        data: {},
    });
}
