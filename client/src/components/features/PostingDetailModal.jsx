import React, { useState, useEffect } from 'react'
import { X, Calendar, Image, MapPin } from 'lucide-react'
import { motion } from "framer-motion"
import { useAuth } from '../../context/AuthContext'

export const PostingDetailModal = ({setIsOpen, selectedPost}) => {
    const { user } = useAuth()
    const [saved, setSaved] = useState(false)

    //a use effect for checking if the selected post is already saved by the user, and setting the saved state accordingly
    useEffect(() => {
        const checkSaved = async () => {
            if (!user) return
            try {
                const res = await fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved`)
                const data = await res.json()
                const isSaved = data.some(post => post.posting_id === selectedPost.id)
                setSaved(isSaved)
            } catch (error) {
                console.error("Error checking saved:", error)
            }
        }
        checkSaved()
    }, [selectedPost.id, user])
    //handling saved state for the save button in the modal 
    const handleSave = async () => {
        if (!user) return
        try {
            if (!saved) {
                const res = await fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ posting_id: selectedPost.id })
                })
                if (res.ok) setSaved(true)
            } else {
                const res = await fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved/${selectedPost.id}`, {
                    method: 'DELETE'
                })
                if (res.ok) setSaved(false)
            }
        } catch (error) {
            console.error("Error saving post:", error)
        }
    }

    // Function for formatting selectedPost startTime/endTime (ChatGPT)
    function formatDateTime(startTime, endTime) {
        const start = new Date(startTime)
        const end = new Date(endTime)

        const getSuffix = (day) => {
            if (day >= 11 && day <= 13) return "th"

            switch (day % 10) {
                case 1:
                    return "st"
                case 2:
                    return "nd"
                case 3:
                    return "rd"
                default:
                    return "th"
            }
        }

        const month = start.toLocaleString("en-US", { month: "long" })
        const day = start.getDate()
        const year = start.getFullYear()

        const startFormatted = start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })

        const endFormatted = end.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })

        return `${month} ${day}${getSuffix(day)}, ${year} ${startFormatted}-${endFormatted}`
    }

  return (
    <div
        className="fixed inset-0 z-50 bg-black/20"
        onClick={() => setIsOpen(false)}
    >
    {/* Div surrounding entire modal */}
    <motion.div className="fixed overflow-hidden right-0 top-0 bg-[#FFDCBE] w-[90vw] min-w-[300px] max-w-[600px] h-screen rounded-tl-[50px] rounded-bl-[50px]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}

        onClick={(e) => e.stopPropagation()}
    >
        
        {/* Div surrounding modal content */}
        <div className="h-full overflow-y-auto p-8">
            {/* Div surrounding modal header */}
            <div className="flex flex-row justify-between items-center text-[#FF4F00] text-[32px]">
                <h1>View Event</h1>
                <X className="w-[48px] h-[48px]" onClick={() => setIsOpen(false)}></X>
            </div>

            {/* Div surrounding event information */}
            <div className="flex flex-col gap-10 p-6"> 
                <div className="flex flex-col gap-2">
                    <h1 className="text-black text-2xl">{selectedPost.title}</h1>
                    <div className="flex flex-row gap-5 text-[#4A4459]">
                        <Calendar/>
                        <p>{formatDateTime(selectedPost.start_time, selectedPost.end_time)}</p>            
                    </div>
                    <div className="flex flex-row gap-5 text-[#4A4459]">
                        <MapPin/>
                        <p>{selectedPost.location}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <p>Description:</p>
                    <p>{selectedPost.description}</p>
                </div>
                                        
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl text-[#FF4F00]">Mentions</h1>
                    <div className="flex flex-row gap-5 items-center">
                        {/* Placeholder */}
                        <div className="w-[50px] h-[50px] rounded-full bg-[#FF4F00] text-white flex items-center justify-center">
                            IMG
                        </div>
                        <p>{selectedPost.created_by}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full h-[350px] rounded-[10px] bg-gray-300 text-white">
                    {/* Placeholder */}
                    {selectedPost.photo_url ? (
                        <img
                        src={selectedPost.photo_url}
                        alt="event"
                        className="w-full h-full object-cover rounded-[10px]"
                        />
                    ) : (
                        <Image />
                    )}
                </div>
                 
                 <button
                    onClick={handleSave}
                    className={`w-full py-3 rounded-xl font-semibold text-black transition-colors duration-200 
                        ${saved 
                             ? 'bg-[#F3923B]'
                            : 'bg-gradient-to-b from-[#FCBE86] to-[#F3923B] hover:from-[#e04500] hover:to-[#e08900]'
                        }`}>
                    {saved ? 'Unsave Event' : 'Save Event'}
                </button>
            </div>
        </div>
    </motion.div>
    </div>
  )
}
