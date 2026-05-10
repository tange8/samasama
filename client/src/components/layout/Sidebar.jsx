import { Link, useNavigate } from "react-router-dom";  // to link to pages
import { House, User, Calendar, LogOut } from "lucide-react"
import samasama_logo from "../../assets/samasama_logo.svg"
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/login")
    }
    
    return (
        // sticky: Tells the browser to lock this element in place when scrolling.
        // top-0: Locks it exactly to the top pixel of the monitor.
        // h-screen: Forces the sidebar to span the exact height of the monitor.
        // flex-col: stack items vertically
        <aside className="w-[200px] bg-linear-to-b from-[#FFDDBE] to-[#fff4ea] flex flex-col flex-shrink-0 align-left p-4 sticky top-0 h-screen shadow-lg shadow-black/20">
            
            <div className="flex flex-col items-start h-full justify-between p-6">

            {/* Navigation Links Area */}
            <nav className="flex flex-col items-center gap-6">
                {/* Links will go here */}
                <Link to="/" className="pb-6">
                    <img src={samasama_logo} alt="SamaSama logo" width="110" />
                </Link>
                <Link to="/" className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#070154] p-2 rounded-[10px]">
                        <House
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#070154] duration-300">Home</p>
                </Link>
                <Link to="/profile" className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#FF1B29] p-2 rounded-[10px]">
                        <User
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#FF1B29] duration-300">Profile</p>
                </Link>

                <Link to="/events" className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#FF4F00] p-2 rounded-[10px]">
                        <Calendar
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#FF4F00] duration-300">Events</p>
                </Link>
            </nav>

                {/* Log out; No functionality right now */}
                <button 
                    onClick={handleLogout}
                    className="flex flex-row gap-2 justify-center items-center cursor-pointer"
                >
                    <div className="bg-[#FF1B29] p-2 rounded-[10px]">
                        <LogOut
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#FF1B29] duration-300">Logout</p>
                </button>
            </div>

        </aside>
    );
}
