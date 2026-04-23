import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PostingCard from "../components/features/PostingCard"
import { CreatePostingModal } from "../components/features/CreatePostingModal";
import { PostingDetailModal } from "../components/features/PostingDetailModal";
import { Calendar } from "../components/features/Calendar";
import { AnimatePresence } from "framer-motion";
import { Search, Plus } from "lucide-react"

export default function Home() {

    const dummyData = [
    {
        id: "p1",
        title: "FUSION General Meeting #1",
        description:
        "Come join our first general meeting of the quarter! We’ll introduce the board, upcoming events, and socials.",
        group_id: "a1b2c3d4-1111-1111-1111-111111111111",
        photo_url: "https://i.redd.it/k5v48axtppqc1.jpeg",
        start_time: "2026-04-02T17:00:00Z",
        end_time: "2026-04-02T21:00:00Z",
        location: "Dr. White Room",
        created_by: "Fusion",
        type: "event",
        collab_group_id: null,
    },
    {
        id: "p2",
        title: "Boba Fundraiser 🍹",
        description:
        "Support Kababayan by buying boba at 7 Leaves! All proceeds go to future cultural events.",
        group_id: "a1b2c3d4-2222-2222-2222-222222222222",
        photo_url: "https://tb-static.uber.com/prod/image-proc/processed_images/7ed678eb0be2e2f1ee382620ae0b1d59/783282f6131ef2258e5bcd87c46aa87e.jpeg",
        start_time: "2026-04-05T12:00:00Z",
        end_time: "2026-04-05T21:00:00Z",
        location: "7 Leaves Cafe, Irvine",
        created_by: "Kababayan",
        type: "fundraiser",
        collab_group_id: "a1b2c3d4-1111-1111-1111-111111111111",
    },
    {
        id: "p3",
        title: "PUSO Dance Workshop",
        description:
        "Learn choreography and basics of cultural fusion dance styles. Beginners welcome!",
        group_id: "a1b2c3d4-3333-3333-3333-333333333333",
        photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2chTvOJFLYcOnQZIhEEcmnUrWYRk4LsS9Bg&s",
        start_time: "2026-04-10T18:00:00Z",
        end_time: "2026-04-10T20:00:00Z",
        location: "Student Center Stage",
        created_by: "Puso",
        type: "event",
        collab_group_id: null,
    },
    {
        id: "p4",
        title: "PASS Karaoke Night 🎤",
        description:
        "Come sing your heart out with PASS! Food, music, and community vibes.",
        group_id: "a1b2c3d4-4444-4444-4444-444444444444",
        photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfWQucwmmMTc15vdadYt9zmrtnklbROxCFsQ&s",
        start_time: "2026-04-12T19:00:00Z",
        end_time: "2026-04-12T23:00:00Z",
        location: "APAD Lounge",
        created_by: "Pass",
        type: "event",
        collab_group_id: null,
    },
    {
        id: "p5",
        title: "Alyansa Cultural Night 🌙",
        description:
            "Join all Alyansa orgs for a night of performances, food, and cultural showcases celebrating Filipino heritage and student talent.",
        group_id: "a1b2c3d4-1111-1111-1111-111111111111",
        photo_url:
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
        start_time: "2026-04-18T18:00:00Z",
        end_time: "2026-04-18T22:00:00Z",
        location: "UCI Student Center Terrace",
        created_by: "Fusion",
        type: "event",
        collab_group_id: "a1b2c3d4-2222-2222-2222-222222222222",
    }
    ];

    const dummyUsers = [
        {
            id: "a1b2c3d4-1111-1111-1111-111111111111",
            name: "FUSION",
            description: "Filipinx student cultural organization at UCI",
            entity_type: "club",
            created_by: "u1",
            phone_number: "555-111-2222",
        },
        {
            id: "a1b2c3d4-2222-2222-2222-222222222222",
            name: "Kababayan",
            description: "Filipino American cultural organization",
            entity_type: "club",
            created_by: "u2",
            phone_number: "555-222-3333",
        },
        {
            id: "a1b2c3d4-3333-3333-3333-333333333333",
            name: "PUSO",
            description: "Performing arts and cultural org",
            entity_type: "club",
            created_by: "u3",
            phone_number: "555-333-4444",
        },
        {
            id: "a1b2c3d4-4444-4444-4444-444444444444",
            name: "PASS",
            description: "Philippine American student society",
            entity_type: "club",
            created_by: "u4",
            phone_number: "555-444-5555",
        },
    ];

    const alyansa = [
        {
            name: "Kababayan",
            img: "https://media.licdn.com/dms/image/v2/C5603AQFdCPmV7sIXFA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1547835337493?e=2147483647&v=beta&t=kH-UVCpU8xytbigEcKay2JOKVi3TXKtzTBx_IEc3cAQ",
            alt: "kaba_pfp",
        },
        {
            name: "Fusion",
            img: "https://media.licdn.com/dms/image/v2/C560BAQEOlDm_F7INwA/company-logo_200_200/company-logo_200_200/0/1630650698220/fusionuci_logo?e=2147483647&v=beta&t=7QYSb0PKtVoMMCfVFgQjZFOT-zojH_d5Bbxd7GsE5sY",
            alt: "fusion_pfp",
        },
        {
            name: "Puso",
            img: "https://static.wixstatic.com/media/e18f91_03b9463843b049bdb9f55b4658b944dc~mv2.png/v1/fill/w_238,h_237,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Group%205.png",
            alt: "puso_pfp",
        },
        {
            name: "Pass",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9ocvgVN9sxu0V-nPpn1cYaBer6gV1h_WvA&s",
            alt: "pass_pfp",
        },
    ];
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [range, setRange] = useState(); 
    const { user } = useAuth(null);

    return (
        <div className="flex flex-col bg-[#FFDDBE] min-h-screen h-screen w-full overscroll-none py-6 px-15 gap-5">
    
            <div className="flex flex-col w-full gap-4">
                <h1 className="text-[#070154] text-2xl font-medium">Welcome back, USERNAME!</h1>
                <div className="flex flex-row w-full mx-25 gap-15 items-stretch">
                    <div className="flex flex-col h-full max-h-[calc(100vh-100px)] overflow-y-auto bg-[#FFE3CA] border-3 border-[#FF9B00] rounded-md p-5 gap-4">
                        {/* Search Bar */}
                        <div className="flex flex-row bg-[#FFDDBE] border-3 border-[#FF4F00] rounded-md p-2 gap-4">
                            <Search color="#FF4F00"/>
                            <input
                                type="text"
                                placeholder="Search for clubs, events, etc."
                                className="bg-transparent outline-none w-full"
                            />
                        </div>
                        {dummyData.map((post) => (
                            <div
                                key={post.id}
                                className="w-full"
                                onClick={() => {setIsOpen(true); setSelectedPost(post)}}
                            >
                            <PostingCard key={post.id} posting={post}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-15">
                        <Calendar range={range} setRange={setRange}/>

                        {/* Alyansa filtering checkboxes */}
                        <div className="flex flex-col w-full justify-center items-center bg-[#FFE3CA] border-3 border-[#FF4F00] rounded-md p-4 gap-4">
                            <p className="font-semibold">Alyansa</p>
                            <div className="grid grid-cols-2 gap-x-6">
                                {alyansa.map((org) => (
                                    <label key={org.name} className="flex flex-row justify-between items-center gap-4 cursor-pointer">
                                        <div className="flex flex-row items-center gap-2">
                                            <img
                                                className="w-[28px] h-[28px] rounded-full"
                                                src={org.img}
                                                alt={org.alt}
                                            />
                                            <p>{org.name}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="w-[20px] h-[20px] border-2 border-[#070154] accent-[#070154] cursor-pointer"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                        </div>

                        {/* + button: create post */}
                        { (user?.type == "business" || user?.type == "org_member") && (
                        <div className="flex justify-end mt-auto">
                            <button className="flex justify-center items-center bg-[#FF4F00] rounded w-[60px] h-[60px] cursor-pointer" onClick={() => setAddEventOpen(true)}>
                                <Plus size={34} color="#FFDCBE"/>
                            </button>
                        </div>
                        )}
                    </div>

                    <AnimatePresence>
                    {addEventOpen && (
                        <CreatePostingModal setAddEventOpen={setAddEventOpen}/>
                    )}
                    {isOpen && (
                        <PostingDetailModal setIsOpen={setIsOpen} selectedPost={selectedPost}/>
                    )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
      
    )
}