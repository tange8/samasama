import { HiOutlineUserGroup, HiOutlineClock } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiImageOn } from "react-icons/ci";

export default function PostingCard({ posting }) {
    const formatTime = (timeString) => {
        if (!timeString) return null;
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
        return new Date(timeString).toLocaleDateString('en-US', options);
    };

    return ( 
    <div className="flex w-full max-w-[800px] bg-[#FFDCBE] border-3 border-[#070154] rounded-md p-5 gap-4">
        
        {/* Image */}
        <div className="w-[130px] h-[130px] bg-[#D3D3D3] rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center">
            {posting.image_url ? (
                <img
                    src={posting.image_url}
                    alt="posting"
                    className="w-full h-full object-cover"
                />
            ) : (
                <CiImageOn className="text-white text-4xl" />
            )}
        </div>

        {/* Title + Description */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
            <h2 className="text-lg font-bold text-[#070154] truncate">
                {posting.title}
            </h2>
            <p className="text-sm text-gray-800 overflow-hidden"
            style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
            }}
            >
                {posting.description}
            </p>
        </div>

        {/* Group Name + Date Range + Location */}
        <div className="flex flex-col max-w-[180px] justify-between text-sm text-gray-700 flex-shrink-0">
            <div className="flex items-center gap-2">
                <HiOutlineUserGroup className="text-red-500 text-xl flex-shrink-0" /> {posting.group_name}
            </div>
            <div className="flex items-center gap-2">
                <HiOutlineClock className="text-orange-600 text-xl flex-shrink-0" /> {formatTime(posting.start_time)} - {formatTime(posting.end_time)}
            </div>
            <div className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-orange-400 text-xl flex-shrink-0" /> {posting.location}
            </div>
        </div>

    </div>
);
}