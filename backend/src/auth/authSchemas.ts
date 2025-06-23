import { z } from "zod";

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string(),
    name: z.string(),
});

export type LoginUser = z.infer<typeof loginUserSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
