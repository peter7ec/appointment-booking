import { ApiResponse, AuthReqObject } from "../types/global";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/global";

export interface AuthorizedResponse extends Request {
    user?: CheckedRole;
}

type CheckedRole = {
    id: string;
    email: string;
    role: string;
    iat: number;
};

export default function authorize(
    req: AuthorizedResponse,
    res: Response<ApiResponse<{}>>,
    next: NextFunction
) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        res.send({
            ok: false,
            message: "Unauthorized, Permission denied",
            data: {},
        });
        return;
    }
    const token = bearerToken.slice(7);

    try {
        const payload = jwt.verify(token, JWT_SECRET as string) as CheckedRole;
        req.user = payload;

        next();
    } catch (error) {
        res.send({
            ok: false,
            message: "Unauthorized, Permission denied",
            data: {},
        });
    }
}
