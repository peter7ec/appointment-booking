import Header from "../components/Header";
import { Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div>
            <Header></Header>
            <main className="px-4 md:px-40 py-4">
                <Outlet></Outlet>
            </main>
        </div>
    );
}
