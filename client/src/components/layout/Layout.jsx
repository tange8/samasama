import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../../assets/Header.svg";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="flex flex-1 w-full bg-[#FFDDBE]">
                <Sidebar />
                
                <main className="flex-grow flex flex-col items-center">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
}