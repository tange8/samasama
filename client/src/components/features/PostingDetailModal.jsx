import React, { useState, useEffect } from 'react'
import { X, Calendar, Image, MapPin } from 'lucide-react'
import { motion } from "framer-motion"
import { useAuth } from '../../context/AuthContext'

export const PostingDetailModal = ({ setIsOpen, selectedPost }) => {
    const { user } = useAuth()
    const [saved, setSaved] = useState(false)

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

    function formatDateTime(startTime, endTime) {
        const start = new Date(startTime)
        const end = new Date(endTime)

        const getSuffix = (day) => {
            if (day >= 11 && day <= 13) return "th"
            switch (day % 10) {
                case 1: return "st"
                case 2: return "nd"
                case 3: return "rd"
                default: return "th"
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

        return `${month} ${day}${getSuffix(day)}, ${year} ${startFormatted} - ${endFormatted}`
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setIsOpen(false)}
        >
            <motion.div
                className="fixed right-0 top-0 bg-[#FFF4EA] w-[92vw] max-w-[650px] h-screen rounded-tl-[40px] rounded-bl-[40px] shadow-[-10px_0_40px_rgba(0,0,0,0.15)]"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-full overflow-y-auto p-8 flex flex-col gap-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-[28px] font-black text-[#070154]">
                            Event Details
                        </h1>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#070154] hover:bg-[#FF9B00]/10 transition-all active:scale-95"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Title + Meta */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-[22px] font-bold text-[#070154]">
                            {selectedPost.title}
                        </h2>

                        <div className="flex flex-col gap-2 text-[14px] text-[#070154]/70">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-[#FF9B00]" size={18} />
                                <span>
                                    {formatDateTime(selectedPost.start_time, selectedPost.end_time)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="text-[#FF1B29]" size={18} />
                                <span>{selectedPost.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#070154] font-semibold">
                            Description
                        </h3>

                        <p className="text-[#070154]/80 text-[14px] leading-relaxed">
                            {selectedPost.description}
                        </p>
                    </div>

                    {/* Mentions */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-[18px] font-bold text-[#FF9B00]">
                            Posted by
                        </h3>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FF1B29] text-white flex items-center justify-center text-sm font-bold">
                                {selectedPost.created_by?.[0] || "U"}
                            </div>

                            <span className="text-[#070154] font-medium">
                                {selectedPost.created_by}
                            </span>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full h-[320px] rounded-[14px] bg-[#FFDDBE] overflow-hidden flex items-center justify-center">
                        {selectedPost.photo_url ? (
                            <img
                                src={selectedPost.photo_url}
                                alt="event"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image className="text-[#070154]/40" />
                        )}
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className={`
                            w-full py-3 rounded-xl font-semibold transition-all active:scale-98
                            ${saved
                                ? "bg-[#FF1B29] text-white hover:bg-[#e01622]"
                                : "bg-[#FF9B00] text-white hover:bg-[#e68c00]"
                            }
                        `}
                    >
                        {saved ? "Unsave Event" : "Save Event"}
                    </button>

                </div>
            </motion.div>
        </div>
    )
}
