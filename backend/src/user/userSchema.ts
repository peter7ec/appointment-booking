import { Role } from "@prisma/client";
import { z } from "zod";
import { email } from "zod/v4";

export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string(),
    name: z.string(),
});

export const editUserData = z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
});

export type EditUser = z.infer<typeof editUserData>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
