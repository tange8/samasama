import { Link } from "react-router-dom";  // to link to pages

export default function Sidebar() {
    return (
        // sticky: Tells the browser to lock this element in place when scrolling.
        // top-0: Locks it exactly to the top pixel of the monitor.
        // h-screen: Forces the sidebar to span the exact height of the monitor.
        // flex-col: stack items vertically
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 sticky top-0 h-screen">
            
            <div>
                sidebar
            </div>

            {/* Navigation Links Area */}
            <nav className="flex flex-col gap-4 text-[#070154] text-lg font-semibold">
                <Link to="/" className="hover:text-[#FF4F00]">Home</Link>
                <Link to="/profile" className="hover:text-[#FF4F00]">Profile</Link>
            </nav>

        </aside>
    );
}