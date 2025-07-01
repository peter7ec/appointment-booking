import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/contexts/AuthContext";

import { useCallback, useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

const initialRegisterFormData = {
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
};

export default function RegisterPage() {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialRegisterFormData);
    const [error, setError] = useState("");

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (
                !formData.email ||
                !formData.password ||
                !formData.name ||
                !formData.phoneNumber ||
                !auth
            ) {
                return;
            }

            const registerResult = await auth.register(
                formData.email,
                formData.name,
                formData.phoneNumber,
                formData.password
            );

            if (!registerResult.ok) {
                setError(registerResult.message);
                return;
            }

            navigate("/login", {
                state: { message: "Success register! Now you can login!" },
            });
        },
        [auth, formData, navigate]
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
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                ></Input>
            </div>
            <div className="my-5 w-8/10">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                ></Input>
            </div>
            <div className="my-5 w-8/10">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                        })
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
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                ></Input>
            </div>
            <div className="my-5 w-8/10 flex justify-between">
                <Button className="bg-blue-400 rounded-xl" type="submit">
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
