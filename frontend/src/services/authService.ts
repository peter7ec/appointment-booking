import { API_URL } from "../constants/environment";
import type { ApiResponse, LoginResponse } from "../types/global";

const authService = {
    async register() {},

    async login(
        email: string,
        password: string
    ): Promise<ApiResponse<LoginResponse>> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, password }),
        });
        return response.json();
    },
};

export default authService;
