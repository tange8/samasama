import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            
            <main className="flex-grow flex flex-col items-center">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}