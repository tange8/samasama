import { HiOutlineUserGroup, HiOutlineClock } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiImageOn } from "react-icons/ci";


import pusoLogo from "../../assets/PUSO.jpg";
import fusionLogo from "../../assets/FUSION.jpg";
import kababayanLogo from "../../assets/kaba.jpg";
import passLogo from "../../assets/PASS.jpg";

const ORG_LOGOS = {
    "PUSO": pusoLogo,
    "FUSION": fusionLogo,
    "KABABAYAN": kababayanLogo,
    "PASS": passLogo,
};

export default function GroupCard({ group }) {
    const formatMeetingTime = (time) => {
        if (!time) return "";

        const [hours, minutes] = time.split(":");
        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const logo = ORG_LOGOS[group.name];


    return (
        <div className="flex w-full bg-[#FFF4EA] rounded-[10px] p-5 gap-5 cursor-pointer hover:bg-[#fff0e0] transition-all active:scale-98">
            
            <div className="w-[130px] h-[130px] bg-[#FFDDBE] rounded-[10px] flex-shrink-0 overflow-hidden flex items-center justify-center">
                {logo ? (
                    <img src={logo} alt={group.name} className="object-cover w-full h-full" />
                ) : (
                    <CiImageOn className="text-[#070154]/40 text-4xl" />
                )}
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-[22px] font-bold text-[#070154] truncate">{group.name}</h2>
                <p 
                    className="text-[15px] text-[#070154]/75 mt-2 overflow-hidden leading-relaxed"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                    }}
                >
                    {group.description}
                </p>
            </div>
            
            <div className="flex flex-col max-w-[220px] justify-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-2 text-[#070154]/80 text-[14px]">
                    <HiOutlineUserGroup className="text-[#FF1B29] text-[20px] flex-shrink-0" />
                    <span className="truncate">{group.type}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#070154]/80 text-[14px]">
                    <HiOutlineClock className="text-[#FF4F00] text-[20px] flex-shrink-0" />
                    <span className="truncate">{formatMeetingTime(group.meeting_time)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#070154]/80 text-[14px]">
                    <HiOutlineLocationMarker className="text-[#FF9B00] text-[20px] flex-shrink-0" />
                    <span className="truncate">{group.location}</span>
                </div>
            </div>
        </div>
    );
}