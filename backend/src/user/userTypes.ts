import { User } from "@prisma/client";

export type UserNoPw = Omit<User, "password">;
