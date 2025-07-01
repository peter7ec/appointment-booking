import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
    const auth = useContext(AuthContext);
    /* const navigate = useNavigate(); */

    /* const navigateToLogin = () => {
        navigate("/login");
    }; */

    return (
        <div className="flex justify-center">
            <header className="bg-blue-500 mt-3 h-14 w-9/10 rounded-xl shadow-xl flex items-center justify-between px-10 text-white">
                <h1 className="text-2xl">
                    <Link to="/">Company name</Link>
                </h1>
                <div className="flex items-center justify-center gap-4">
                    {auth?.user?.id && auth?.user?.role === "CLIENT" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-blue-500 rounded-xl hover:bg-blue-800">
                                    Appointment
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <Link to="/login">New Appointment</Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel>
                                        <Link to="/login">My Appointments</Link>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-blue-500 rounded-xl hover:bg-blue-800">
                                Account
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {!auth?.user?.id && (
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <Link to="/login">Login</Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel>
                                        <Link to="/register">Register</Link>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                            )}
                            {auth?.user?.id && (
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <Link to="/login">Password reset</Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel onClick={auth.logOut}>
                                        <Link to="/login">My informations</Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel onClick={auth.logOut}>
                                        <Link to="/login">Logout</Link>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    );
}
