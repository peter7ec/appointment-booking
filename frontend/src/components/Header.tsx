import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";
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

    return (
        <div className="flex justify-center">
            <header className="bg-blue-500 mt-3 md:h-14 w-9/10 rounded-xl shadow-xl flex items-center justify-between px-10 text-white">
                <h1 className="md:text-2xl">
                    <Link to="/">Company name</Link>
                </h1>
                <div className="flex items-center justify-center sm:flex-row flex-col">
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
                                        <Link to="/new-appointment">
                                            New Appointment
                                        </Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel>
                                        <Link to="/my-appointments">
                                            My Appointments
                                        </Link>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {auth?.user?.id && auth?.user?.role === "ADMIN" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-blue-500 rounded-xl hover:bg-blue-800">
                                    Users options
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <Link to="/role-settings">
                                            Role settings
                                        </Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel>
                                        <Link to="/all-users">All users</Link>
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
                                        <Link to="/password-reset">
                                            Password reset
                                        </Link>
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel onClick={auth.logOut}>
                                        <Link to="/my-info">
                                            My informations
                                        </Link>
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
