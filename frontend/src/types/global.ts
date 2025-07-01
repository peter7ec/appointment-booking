export type JwtToken = string;

export type ApiResponse<T> = {
    ok: boolean;
    message: string;
    data: T;
};

export type LoginResponse = {
    token?: JwtToken;
};
export type Ticket = {
    id: string;
    title: string;
    description: string;
    status: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    User: {
        name: string;
    };
};

export enum UserRole {
    User = "CLIENT",
    Provider = "PROVIDER",
    Admin = "ADMIN",
}

export type AuthUser = {
    id: string;
    email: string;
    role: UserRole;
    token: string;
};
