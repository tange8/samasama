import React from 'react'

export const PostingDetailModal = ({setIsOpen, selectedPost}) => {
    
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
    /* Div surrounding entire modal */
    <div class="fixed right-0 top-0 bg-[#FFDCBE] max-w-[859px] h-screen rounded-tl-[15px] rounded-bl-[15px] p-8">
        
        {/* Div surrounding modal content */}
        <div class="h-full overflow-y-auto">
            {/* Div surrounding modal header */}
            <div class="flex flex-row gap-100 text-[#FF4F00] text-[32px]">
                <h1>View Event</h1>
                <button
                    onClick={() => setIsOpen(false)}
                >X</button>
            </div>

            {/* Div surrounding event information */}
            <div class="flex flex-col gap-10 p-6"> 
                <div class="flex flex-col gap-2">
                    <h1 class="text-black text-2xl">{selectedPost.title}</h1>
                    <div class="flex flex-row gap-5 text-[#4A4459]">
                        <p>Calendar Icon</p>
                        <p>{formatDateTime(selectedPost.start_time, selectedPost.end_time)}</p>            
                    </div>
                </div>

                <div class="flex flex-col gap-5">
                    <p>Description:</p>
                    <p>{selectedPost.description}</p>
                </div>

                <div class="flex flex-col gap-5">
                    <h1 class="text-2xl text-[#FF4F00]">Tags</h1>
                    <div class="flex flex-row w-fit gap-5 p-2 bg-[#FF4F00] text-white rounded-[10px]">
                        <p>Event Tag</p>
                        <p>X</p>
                    </div>
                </div>
                                        
                <div class="flex flex-col gap-5">
                    <h1 class="text-2xl text-[#FF4F00]">Mentions</h1>
                    <div class="flex flex-row gap-5 items-center">
                        <div className="w-[50px] h-[50px] rounded-full bg-[#FF4F00] text-white flex items-center justify-center">
                            IMG
                        </div>
                        <p>{selectedPost.group_name}</p>
                    </div>
                </div>

                <div class="flex items-center justify-center w-full h-[276px] rounded-[5px] bg-gray-300 text-white">
                    IMAGE
                </div>

            </div>
        </div>
    </div>
  )
}
