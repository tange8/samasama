import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <div className="flex w-full h-full">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto bg-[#FFDDBE]">
                <Outlet />
            </main>
        </div>
    );
}