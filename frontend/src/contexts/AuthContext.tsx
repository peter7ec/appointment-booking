import authService from "../services/authService";
import type { AuthUser, UserRole } from "../types/global";
import { jwtDecode } from "jwt-decode";
import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router";

type AuthContextProviderProps = {
    children: ReactNode;
};

type RegisterParams = Parameters<typeof authService.register>;
type RegisterSuccess = {
    ok: boolean;
    message: string;
};

type LoginSuccess = {
    ok: boolean;
    message: string;
};

type AuthTokenData = {
    id: string;
    email: string;
    role: UserRole;
};

type AuthContextType = {
    user: AuthUser | undefined;
    login: (email: string, password: string) => Promise<LoginSuccess>;
    register: (
        email: string,
        name: string,
        phoneNumber: string,
        password: string
    ) => Promise<RegisterSuccess>;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<AuthUser | undefined>();

    const register = useCallback(
        async (
            email: string,
            name: string,
            phoneNumber: string,
            password: string
        ): Promise<RegisterSuccess> => {
            const registerResponse = await authService.register(
                email,
                name,
                phoneNumber,
                password
            );

            if (!registerResponse.ok) {
                return {
                    ok: false,
                    message: registerResponse.message || "Failed Registration",
                };
            }

            return { ok: true, message: "Registered successfully" };
        },
        []
    );

    const login = useCallback(
        async (email: string, password: string): Promise<LoginSuccess> => {
            const loginResponse = await authService.login(email, password);

            if (!loginResponse.ok || !loginResponse.data?.token) {
                console.log(loginResponse);
                return { ok: false, message: loginResponse.message };
            }

            const decodedToken = jwtDecode<AuthTokenData>(
                loginResponse.data.token
            );

            const lsAuth = { token: loginResponse.data.token, ...decodedToken };

            localStorage.setItem("auth", JSON.stringify(lsAuth));

            setUser(lsAuth);

            return { ok: true, message: "Successfully logged in!" };
        },
        []
    );

    const logOut = useCallback(() => {
        localStorage.removeItem("auth");
        setUser(undefined);
        navigate("/login");
    }, []);

    useEffect(() => {
        const lsUserString = localStorage.getItem("auth");
        //TODO: validate local storage data

        if (lsUserString) {
            /* const lsUser = JSON.parse(lsUserString) as AuthUser;

            setUser(lsUser); */
            if (!lsUserString) {
                return;
            }

            try {
                const lsUser = JSON.parse(lsUserString) as AuthUser;

                if (
                    !lsUser.token ||
                    !lsUser.id ||
                    !lsUser.email ||
                    !lsUser.role
                ) {
                    console.error(
                        "Missing or corrupted auth data in localStorage."
                    );
                    localStorage.removeItem("auth");
                    return;
                }

                setUser(lsUser);
            } catch (error) {
                console.error("Localstorage auth data error:", error);
                localStorage.removeItem("auth");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ login, register, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}

//Context: token, email, role, userId

export default AuthContext;
