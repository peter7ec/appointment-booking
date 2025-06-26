import { User, Role } from "@prisma/client";
import prisma from "../utils/prisma";
import HttpError from "../utils/HttpError";
import { UserNoPw } from "./userTypes";
import bcrypt from "bcryptjs";
import { EditUser, RegisterUser } from "./userSchema";
import { UserResponse } from "../auth/authTypes";

const noPwSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
    phoneNumber: true,
    createdAt: true,
    updatedAt: true,
};

const userService = {
    getAllUser: async () => {
        return await prisma.user.findMany({
            select: noPwSelect,
        });
    },
    getUserById: async (userId: string): Promise<User> => {
        const userExist = await prisma.user.count({ where: { id: userId } });

        if (!userExist) throw new HttpError("User does not exists", 404);

        const foundedUser = (await prisma.user.findUnique({
            where: { id: userId },
        })) as User;

        return foundedUser;
    },
    getMyData: async (userId: string): Promise<UserNoPw> => {
        const userData = await prisma.user.findUnique({
            where: { id: userId },
            select: noPwSelect,
        });

        return userData!;
    },
    updatePassword: async (
        userId: string,
        newPassword: string
    ): Promise<UserNoPw> => {
        const userExist = await prisma.user.count({ where: { id: userId } });

        if (!userExist) throw new HttpError("User does not exists", 404);

        if (!newPassword) throw new HttpError("Enter Password", 403);

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        const editedPassword = await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
            select: noPwSelect,
        });

        return editedPassword;
    },

    registerUser: async (registerUser: RegisterUser) => {
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
            select: noPwSelect,
        });
    },

    updateUserData: async (userId: string, userData: EditUser) => {
        const userExist = await prisma.user.count({ where: { id: userId } });

        if (!userExist) throw new HttpError("User does not exists", 404);
        let hashedPassword = "";

        if (userData.password) {
            const salt = bcrypt.genSaltSync(12);
            hashedPassword = bcrypt.hashSync(userData.password, salt);
        }

        const updatedData = await prisma.user.update({
            where: { id: userId },
            data: {
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                name: userData.name,
                role: userData.role as Role,
                password: hashedPassword,
            },
            select: noPwSelect,
        });

        return updatedData;
    },

    deleteUser: async (userId: string): Promise<UserNoPw> => {
        const userExist = await prisma.user.count({ where: { id: userId } });

        if (!userExist) throw new HttpError("User does not exists", 404);

        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        return deletedUser;
    },
};

export default userService;
