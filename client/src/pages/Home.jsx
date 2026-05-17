import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import PostingCard from "../components/features/PostingCard"
import { CreatePostingModal } from "../components/features/CreatePostingModal";
import { PostingDetailModal } from "../components/features/PostingDetailModal";
import { Calendar } from "../components/features/Calendar";
import { AnimatePresence } from "framer-motion";
import { Search, Plus } from "lucide-react"

export default function Home() {
    const [allPostings, setAllPostings] = useState([])

    useEffect(() => {
        const fetchPostings = async () => {
        const res = await fetch('http://localhost:3000/api/postings')
        const data = await res.json()
        const mapped = data.map(post => ({
		...post,
			created_by: post.group?.name || "Unknown"
		}))
        setAllPostings(mapped)
        }

        fetchPostings()
    }, [])

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
    const [orgQuery, setOrgQuery] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAuth();

    const filteredPosts = allPostings.filter(post => {

        // Search Bar Filtering
        const searchResults = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    
        // Calendar Filtering
        const start_date = new Date(post.start_time)
        const end_date = new Date(post.end_time)
        start_date.setHours(0, 0, 0, 0)
        end_date.setHours(0, 0, 0, 0)

        const calendarResults = !range?.from || !range?.to || (end_date <= range?.to) && (start_date >= range?.from)

        // Organization Filtering
        const orgResults = orgQuery.length === 0 || orgQuery.some(org => post.created_by.toLowerCase().includes(org.toLowerCase()))

        return searchResults && calendarResults && orgResults
    })

    return (
	<div className="flex flex-col bg-[#FFF4EA] px-6 py-6 gap-5 h-full overflow-hidden">



			{/* Header */}
			<h1 className="text-[#070154] text-[22px] font-medium">
				Welcome back,
				<span className="font-extrabold"> {user?.name || "Guest"}!</span>
			</h1>

			<div className="flex flex-1 gap-5 min-h-0">

				{/* LEFT: Feed */}
				<div className="flex flex-col flex-[2] min-w-0 overflow-hidden bg-white rounded-[18px] shadow-lg shadow-black/20 p-5 gap-4">

					{/* Search */}
					<div className="flex items-center gap-3 bg-[#FFF4EA] rounded-xl px-4 py-3">
						<Search className="text-[#070154]" size={18} />

						<input
						type="text"
						placeholder="Search events, clubs, posts..."
						className="bg-transparent outline-none w-full text-[#070154]"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Posts */}
					<div className="overflow-y-auto flex flex-col gap-4 flex-1 max-h-[calc(100vh-200px)]">
						{(filteredPosts.length > 0 ? filteredPosts : allPostings).map((post) => (
							<div
							key={post.id}
							className="w-full"
							onClick={() => {
								setIsOpen(true);
								setSelectedPost(post);
							}}
							>
							<PostingCard posting={post} />
							</div>
						))}
					</div>
		    	</div>

		    	{/* RIGHT SIDEBAR */}
		    	<div className="flex flex-col flex-1 min-w-[250px] max-w-[350px] gap-4 items-center">

				<Calendar range={range} setRange={setRange} />

					{/* Alyansa */}
					<div className="flex flex-col w-full bg-white rounded-[18px] shadow-sm p-4 gap-3">

						<p className="font-semibold text-[#070154]">
						Alyansa
						</p>

						<div className="grid grid-cols-2 gap-y-3 gap-x-4">

						{alyansa.map((org) => (
							<label
							key={org.name}
							className="flex items-center justify-between gap-3 cursor-pointer"
							>
							<div className="flex items-center gap-2 min-w-0">
								<img
								className="w-[28px] h-[28px] rounded-full"
								src={org.img}
								alt={org.alt}
								/>
								<p className="text-[12px] text-[#070154] truncate">
								{org.name}
								</p>
							</div>

							<input
								onChange={(e) => {
								if (e.target.checked) {
									setOrgQuery([...orgQuery, org.name]);
								} else {
									setOrgQuery(orgQuery.filter(o => o !== org.name));
								}
								}}
								type="checkbox"
								className="w-[15px] h-[15px] accent-[#FF1B29] cursor-pointer"
							/>
							</label>
						))}

						</div>
					</div>

					{/* Create Button */}
					{(user?.type == "business" || user?.type == "org_member") && (
						<div className="flex justify-end ml-auto mt-auto">

						<button
							className="flex items-center justify-center w-[56px] h-[56px] rounded-xl bg-[#FF1B29] shadow-md hover:bg-[#d91422] active:scale-[0.98] transition-all cursor-pointer"
							onClick={() => setAddEventOpen(true)}
						>
							<Plus size={28} color="#FFF4EA" />
						</button>

						</div>
					)}
		    	</div>

		</div>

	    <AnimatePresence>
		{addEventOpen && (
		    <CreatePostingModal setAddEventOpen={setAddEventOpen} />
		)}
		{isOpen && (
		    <PostingDetailModal
			setIsOpen={setIsOpen}
			selectedPost={selectedPost}
		    />
		)}
	    </AnimatePresence>
	</div>
    );
}
