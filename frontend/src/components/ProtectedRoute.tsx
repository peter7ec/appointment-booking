import AuthContext from "../contexts/AuthContext";
import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const auth = useContext(AuthContext);

    if (!auth || !auth.user?.id) {
        return <Navigate to={"/"} />;
    }
    return children;
}
