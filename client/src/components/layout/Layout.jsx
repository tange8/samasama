import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto items-center bg-[#FFF4EA]">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
