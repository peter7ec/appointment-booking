export type ApiResponse<T> = {
    ok: boolean;
    message: string;
    data: T;
};

export type LoginUserResponseData = { token: string };

export type AuthReqObject = {
    id: string;
    email: string;
    role: string;
};
