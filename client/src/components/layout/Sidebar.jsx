import { Link, useNavigate } from "react-router-dom";  // to link to pages
import { House, User, Calendar, LogOut, Users } from "lucide-react"
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
        <aside className="w-[200px] bg-linear-to-b from-[#FFDDBE] to-[#fff4ea] flex flex-col flex-shrink-0 h-full p-4 shadow-lg shadow-black/20">
            
            <div className="flex flex-col items-start h-full justify-between p-6">

            {/* Navigation Links Area */}
            <nav className="flex flex-col items-center gap-6">
                
                <Link to="/" className="mb-4 w-40">
                    <img src={samasama_logo} alt="SamaSama logo" className="w-30" />
                </Link>

                {/* Added w-40 and justify-start to align icons perfectly */}
                <Link to="/" className="flex flex-row gap-3 justify-start items-center w-40">
                    <div className="bg-[#070154] p-2 rounded">
                        <House
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#070154] duration-300 font-medium">Home</p>
                </Link>
                
                <Link to="/profile" className="flex flex-row gap-3 justify-start items-center w-40">
                    <div className="bg-[#FF1B29] p-2 rounded">
                        <User
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#FF1B29] duration-300 font-medium">Profile</p>
                </Link>

                <Link to="/events" className="flex flex-row gap-3 justify-start items-center w-40">
                    <div className="bg-[#FF4F00] p-2 rounded">
                        <Calendar
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#FF4F00] duration-300 font-medium">Events</p>
                </Link>
                
                <Link to="/meet-team" className="flex flex-row gap-3 justify-start items-center w-40">
                    <div className="bg-[#FF9B00] p-2 rounded">
                        <Users
                            color="#FFDCBE"
                        />
                    </div>
                    <p className="hover:text-[#FF9B00] duration-300 font-medium">About Us</p>
                </Link>
            </nav>

                {/* Wrapped logout in an items-center div to match the nav alignment */}
                <div className="flex flex-col items-center">
                    <button onClick={handleLogout} className="flex flex-row gap-3 justify-start items-center cursor-pointer w-40">
                        <div className="bg-[#FF1B29] p-2 rounded">
                            <LogOut
                                color="#FFDCBE"
                            />
                        </div>
                        <p className="hover:text-[#FF1B29] duration-300 font-medium">Logout</p>
                    </button>
                </div>
            </div>

        </aside>
    );
}