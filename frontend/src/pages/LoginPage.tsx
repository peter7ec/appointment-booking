import { useCallback, useContext, useState, type FormEvent } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

const initialLoginFormData = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialLoginFormData);
    const [error, setError] = useState("");

    const handleRegisterBtn = () => {
        navigate("/register");
    };

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!formData.email || !formData.password || !auth) {
                return;
            }

            const loginResult = await auth.login(
                formData.email,
                formData.password
            );

            if (!loginResult.ok) {
                setError(loginResult.message);
                return;
            }

            navigate("/");
        },
        [auth, formData.email, formData.password]
    );
    return (
        <form onSubmit={handleSubmit} className="flex items-center flex-col">
            <div className="my-5 w-8/10">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                ></Input>
            </div>
            <div className="my-5 w-8/10">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                ></Input>
            </div>
            <div className="my-5 w-8/10 flex justify-between">
                <Button className="bg-blue-400 rounded-xl" type="submit">
                    Login
                </Button>
                <Button
                    className="bg-yellow-500 rounded-xl"
                    type="submit"
                    onClick={handleRegisterBtn}
                >
                    Register
                </Button>
            </div>
            {error && (
                <Alert variant="destructive" className="mt-3 w-8/10">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}
        </form>
    );
}
