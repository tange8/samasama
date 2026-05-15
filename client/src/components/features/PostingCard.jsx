import { HiOutlineUserGroup, HiOutlineClock } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiImageOn } from "react-icons/ci";
import { Rating } from '@mui/material';
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function PostingCard({ posting }) {
    const { user } = useAuth()
    const [saved, setSaved] = useState(false);


    useEffect(() => {
        const checkSaved = async () => {
            if (!user) return
            try {
                const res = await fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved`);
                const data = await res.json()


                const isSaved = data.some((post) => {
                    return post.posting_id === posting.id
                })


                setSaved(isSaved)
                
            } catch (error) {
                console.error("Error fetching post: ", error)
            }
        }




        checkSaved()
    }, [posting.id, user])


    const formatTime = (timeString) => {
        if (!timeString) return null;
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
        return new Date(timeString).toLocaleDateString('en-US', options);
    };


    const handleSaved = async (e) => {
        if (!saved) {
            if (!user) return


            try {
                const res = await fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        posting_id: posting.id
                    })
                })


                if (!res.ok) return


                setSaved(true)
                e.stopPropagation()
            } catch (error) {
                console.error("Error saving post: ", error)
            }
        } else {
            if (!user) return


            try {
                const res = await fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved/${posting.id}`, {
                    method: 'DELETE',


                })


                if (!res.ok) return
                setSaved(false)
                e.stopPropagation()
            } catch (error) {
                console.error("Error unsaving post: ", error)
            }
        }
    }

    return (
	<div className="flex w-full bg-[#FFF4EA] rounded-[10px] p-5 gap-5 cursor-pointer hover:bg-[#fff0e0] transition-all active:scale-98">
	    
	    {/* Image */}
	    <div className="w-[130px] h-[130px] bg-[#FFDDBE] rounded-[10px] flex-shrink-0 overflow-hidden flex items-center justify-center">
		{posting.photo_url ? (
		    <img
			src={posting.photo_url}
			alt="posting"
			className="w-full h-full object-cover"
		    />
		) : (
		    <CiImageOn className="text-[#070154]/40 text-4xl" />
		)}
	    </div>

	    {/* Title + Description */}
	    <div className="flex-1 min-w-0 flex flex-col">
		<h2 className="text-[22px] font-bold text-[#070154] truncate">
		    {posting.title}
		</h2>

		<p 
		    className="text-[15px] text-[#070154]/75 mt-2 overflow-hidden leading-relaxed"
		    style={{
			display: "-webkit-box",
			WebkitBoxOrient: "vertical",
			WebkitLineClamp: 5,
		    }}
		>
		    {posting.description}
		</p>
	    </div>

	    {/* Right Side */}
	    <div className="flex flex-col max-w-[220px] justify-between flex-shrink-0">
		
		{/* Save */}
		<div 
		    className="ml-auto"
		    onClick={(e) => {e.stopPropagation()}}
		>
		    <Rating
			max={1}
			value={saved ? 1 : 0}
			onChange={handleSaved}
			sx={{
			    '& .MuiRating-iconFilled': {
				color: '#FF9B00',
			    },
			    '& .MuiRating-iconEmpty': {
				color: '#07015433',
			    },
			}}
		    />
		</div>

		{/* Creator */}
		<div className="flex items-center gap-2 text-[#070154]/80 text-[14px]">
		    <HiOutlineUserGroup className="text-[#FF1B29] text-[20px] flex-shrink-0" />
		    <span className="truncate">{posting.created_by}</span>
		</div>

		{/* Time */}
		<div className="flex items-center gap-2 text-[#070154]/80 text-[14px]">
		    <HiOutlineClock className="text-[#FF4F00] text-[20px] flex-shrink-0" />
		    <span>
			{formatTime(posting.start_time)} - {formatTime(posting.end_time)}
		    </span>
		</div>

		{/* Location */}
		<div className="flex items-center gap-2 text-[#070154]/80 text-[14px]">
		    <HiOutlineLocationMarker className="text-[#FF9B00] text-[20px] flex-shrink-0" />
		    <span className="truncate">{posting.location}</span>
		</div>
	    </div>

	</div>
    );
}
