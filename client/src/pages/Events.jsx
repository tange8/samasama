import { useState, useEffect } from 'react'
import PostingCard from '../components/features/PostingCard'
import { PostingDetailModal } from '../components/features/PostingDetailModal'
import { useAuth } from '../context/AuthContext'

export default function Events() {
    const [allPostings, setAllPostings] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()
    console.log('Current auth user:', user)
    console.log('Current auth user id:', user?.id)

    useEffect(() => {
        const fetchSavedPostings = async () => {
            if (!user) return

            try {
                const res = await fetch(
                    `http://localhost:3000/api/profiles/user/${user.id}/saved`
                )

                const data = await res.json()
                console.log('Saved postings:', data)

                const mapped = data.map(savedPost => ({
                    ...savedPost.postings,
                    created_by:
                        savedPost.postings.groups?.name || 'Unknown Organization'
                }))

                setAllPostings(mapped)
            } catch (error) {
                console.error('Error fetching saved postings:', error)
            }
        }

        fetchSavedPostings()
    }, [user])

    return (
        <div className="flex flex-col py-6 px-6 gap-5 w-full h-full overflow-y-auto">

            {/* Header */}
            <h1 className="text-[#070154] text-[22px] font-extrabold text-center">
                Saved Events
            </h1>

            {/* Saved Events Container */}
            <div className="w-full min-h-[calc(100vh-120px)] bg-[#F6DEC7] border-2 border-[#FF9B00] rounded-[10px] p-5 shadow-lg shadow-black/20">

                {/* Events Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 justify-items-start">

                    {allPostings.map((posting) => (
                        <div
                            key={posting.id}
                            className="w-full max-w-[760px]"
                            onClick={() => {
                                setSelectedPost(posting)
                                setIsOpen(true)
                            }}
                        >
                            <PostingCard posting={posting} />
                        </div>
                    ))}

                </div>
            </div>

            {/* Event Modal */}
            {isOpen && selectedPost && (
                <PostingDetailModal
                    selectedPost={selectedPost}
                    setIsOpen={setIsOpen}
                />
            )}

        </div>
    )
}
