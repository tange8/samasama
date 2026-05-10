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
        <div className="flex w-full bg-[#FFDCBE] rounded-md p-5 gap-4 cursor-pointer">
            
            {/* Image */}
            <div className="w-[130px] h-[130px] bg-[#D3D3D3] rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center">
                {posting.photo_url ? (
                    <img
                        src={posting.photo_url}
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
                <div 
                    className="ml-auto" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <Rating
                        max={1}
                        value={saved ? 1 : 0}
                        onChange={handleSaved}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <HiOutlineUserGroup className="text-red-500 text-xl flex-shrink-0" /> {posting.created_by}
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
