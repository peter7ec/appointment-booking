import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export default function validateRequestBody<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationResoul = schema.safeParse(req.body);

        if (!validationResoul.success) {
            const errorMessage = validationResoul.error.errors
                .map((error) => `${error.path.join(" ")}:${error.message}`)
                .join(", ");
            res.status(400).json({
                ok: false,
                message: errorMessage,
                data: {},
            });
            return;
        }

        req.body = validationResoul.data;
        next();
    };
}
