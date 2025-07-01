import { API_URL } from "../constants/environment";
import type {
    ApiResponse,
    LoginResponse,
    RegisterResponse,
} from "../types/global";

const authService = {
    async register(
        email: string,
        name: string,
        phoneNumber: string,
        password: string
    ): Promise<ApiResponse<RegisterResponse>> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, phoneNumber, password }),
        });
        return response.json();
    },

    async login(
        email: string,
        password: string
    ): Promise<ApiResponse<LoginResponse>> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },
};

export default authService;
