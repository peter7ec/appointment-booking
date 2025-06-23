import { User } from "@prisma/client";
import HttpError from "../utils/HttpError";
import prisma from "../utils/prisma";
import { LoginUser, RegisterUser } from "./authSchemas";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../constants/global";
import jwt from "jsonwebtoken";
import { UserResponse } from "./authTypes";

const authService = {
    register: async (registerUser: RegisterUser): Promise<UserResponse> => {
        const doesUserExists = await prisma.user.count({
            where: { email: registerUser.email },
        });
        if (doesUserExists) throw new HttpError("User already exists", 409);

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(registerUser.password, salt);

        return await prisma.user.create({
            data: {
                email: registerUser.email,
                password: hashedPassword,
                phoneNumber: registerUser.phoneNumber,
                name: registerUser.name,
            },
            select: {
                id: true,
                email: true,
                name: true,
                phoneNumber: true,
                createdAt: true,
            },
        });
    },
    login: async (loginUser: LoginUser) => {
        const doesUserExists = await prisma.user.count({
            where: { email: loginUser.email },
        });
        if (!doesUserExists)
            throw new HttpError("Invalid email/password!", 403);

        const dbUser = (await prisma.user.findUnique({
            where: { email: loginUser.email },
        })) as User;

        const isPasswordCorrect = bcrypt.compareSync(
            loginUser.password,
            dbUser.password
        );
        if (!isPasswordCorrect) {
            throw new HttpError("Invalid email/password!", 403);
        }

        const jwtPayload = {
            id: dbUser.id,
            email: dbUser.email,
            role: dbUser.role,
        };

        const token = jwt.sign(jwtPayload, JWT_SECRET as string);

        return token;
    },
};

export default authService;
