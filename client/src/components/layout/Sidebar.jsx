import { Link } from "react-router-dom";  // to link to pages
import { House, User, Calendar, LogOut } from "lucide-react"
import samasama_logo from "../../assets/samasama_logo.svg"

export default function Sidebar() {
    return (
        // sticky: Tells the browser to lock this element in place when scrolling.
        // top-0: Locks it exactly to the top pixel of the monitor.
        // h-screen: Forces the sidebar to span the exact height of the monitor.
        // flex-col: stack items vertically
        <aside className="w-64 bg-[#FFDDBE] border-r border-[#E5C6AB] flex flex-col p-4 sticky top-0 h-screen shadow-lg">
            
            <div className="flex flex-col h-[90%] justify-between p-6">

            {/* Navigation Links Area */}
            <nav className="flex flex-col items-center gap-6">
                {/* Links will go here */}
                <Link to="/">
                    <img src={samasama_logo} alt="SamaSama logo" width="100" />
                </Link>
                <Link to="/" className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#070154] p-2 rounded">
                        <House
                            color="#FFDCBE"
                        />
                    </div>
                    <p>Home</p>
                </Link>
                <Link to="/profile" className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#FF1B29] p-2 rounded">
                        <User
                            color="#FFDCBE"
                        />
                    </div>
                    <p>Profile</p>
                </Link>

                {/* No route to Saved Events page */}
                <Link to="/events" className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#FF4F00] p-2 rounded">
                        <Calendar
                            color="#FFDCBE"
                        />
                    </div>
                    <p>Events</p>
                </Link>
            </nav>

                {/* Log out; No functionality right now */}
                <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="bg-[#FF1B29] p-2 rounded">
                        <LogOut
                            color="#FFDCBE"
                        />
                    </div>
                    <p>Logout</p>
                </div>
            </div>

        </aside>
    );
}