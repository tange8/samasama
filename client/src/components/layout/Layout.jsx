import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../../assets/Header.svg";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <img src={Header} alt="" className="w-full z-50 block" />
            <div className="flex flex-1 w-fullbg-[#FFDDBE]">
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