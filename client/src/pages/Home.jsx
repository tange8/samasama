import PostingCard from "../components/features/PostingCard"
import { CreatePostingModal } from "../components/features/CreatePostingModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PostingDetailModal } from "../components/features/PostingDetailModal";
import { Calendar } from "../components/features/Calendar";

export default function Home() {

    const dummyData = [
        {
            id: 1,
            title: "FUSION General Meeting #1",
            description: "Come out to our first general meeting of the quarter! LOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMNLOREM IPSUMN",
            type: "event",
            group_name: "FUSION",
            start_time: "2026-04-02T17:00:00Z",
            end_time: "2026-04-02T21:00:00Z",
            location: "Dr. White Room",
            image_url: "https://i.redd.it/k5v48axtppqc1.jpeg",
        },
        {
            id: 2,
            title: "Boba Fundraiser!",
            description: "Support our club by buying boba!",
            type: "fundraiser",
            group_name: "7 Leaves Cafe",
            start_time: "2026-04-05T12:00:00Z",
            end_time: "2026-04-05T21:00:00Z",
            location: "7 Leaves Cafe, Irvine"
        },
        {
            id: 3,
            title: "LONG LONG LONG LONG TITLE VERY LONG LONG",
            description: "Support our club by buying boba!",
            type: "fundraiser",
            group_name: "7 Leaves Cafe",
            start_time: "2026-04-05T12:00:00Z",
            end_time: "2026-04-05T21:00:00Z",
            location: "7 Leaves Cafe, Irvine"
        },
    ];
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [range, setRange] = useState() 

    return (
        
        <div className="flex flex-col min-h-screen w-full items-center gap-5">
            <Calendar range={range} setRange={setRange}/>
            {dummyData.map((post) => (
                <div
                    key={post.id}
                    className="contents"
                    onClick={() => {setIsOpen(true); setSelectedPost(post)}}
                >
                <PostingCard key={post.id} posting={post}/>
                </div>
            ))}
            <button onClick={() => setAddEventOpen(true)}>+</button>
            <AnimatePresence>
            {addEventOpen && (
                <CreatePostingModal setAddEventOpen={setAddEventOpen}/>
            )}
            {isOpen && (
                <PostingDetailModal setIsOpen={setIsOpen} selectedPost={selectedPost}/>
            )}
            </AnimatePresence>

        </div>
      
    )
}