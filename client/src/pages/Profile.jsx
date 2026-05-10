import React, { useState, useEffect } from 'react';
import ProfileBio from '../components/features/ProfileBio';
import ProfileContent from '../components/features/ProfileContent';
import { useAuth } from '../context/AuthContext';
import { PostingDetailModal } from '../components/features/PostingDetailModal';
import { AnimatePresence } from 'framer-motion';

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [savedOrgs, setSavedOrgs] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [currentRole, setCurrentRole] = useState('student');
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !user.id) return;

        fetch(`http://localhost:3000/api/profiles/users/${user.id}`)
            .then(res => res.json())
            .then(data => {
                const mappedProfile = {
                    ...data,
                    profile_image: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
                    tags: [],
                    linked_in: data.linked_in || "",
                    instagram: data.instagram || "",
                    facebook: data.facebook || "",
                    youtube: data.youtube || "",
                    about: data.about || ""
                };

                setProfile(mappedProfile);
            })
            .catch(console.error);

        fetch(`http://localhost:3000/api/profiles/user/${user.id}/follows`)
            .then(res => res.json())
            .then(data => {
                const cleaned = data
                    .filter(item => item.groups)
                    .map(item => {
                        const group = item.groups;

                        return {
                            id: group.id,
                            name: group.name,
                            description: group.description || 'No description provided',
                            logoUrl: group.photo_url || '',
                            type: group.entity_type === 'organization' ? 'Organization' : 'Group',
                            meeting_time: 'Unknown',
                            location: 'Unknown'
                        };
                    });

                setSavedOrgs(cleaned);
            })
            .catch(console.error);

        fetch(`http://localhost:3000/api/profiles/user/${user.id}/saved`)
            .then(res => res.json())
            .then(data => {
                const cleaned = data.map(item => ({
                    id: item.posting_id,
                    photo_url: item.postings.photo_url,
                    title: item.postings.title,
                    description: item.postings.description,
                    created_by: item.postings.groups.name,
                    start_time: item.postings.start_time,
                    end_time: item.postings.end_time,
                    location: item.postings.location
                }));

                setSavedEvents(cleaned);
            })
            .catch(console.error);

    }, [user]);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFF4EA] text-[#070154]">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF4EA] flex flex-col w-full max-w-[1650px] mx-auto gap-8 pb-10 pt-24 px-12 items-center">

            <h1 className="text-3xl md:text-4xl font-black text-[#070154] self-center">
                My SamaSama Profile
            </h1>

            <ProfileBio
                profileImage={profile.profile_image}
                first_name={profile.first_name}
                last_name={profile.last_name}
                role={profile.role}
                tags={profile.tags || []}
                email={profile.email}
                instagram={profile.instagram}
                linked_in={profile.linked_in}
                facebook={profile.facebook}
                youtube={profile.youtube}
                about={profile.about}
                id={user.id}
            />

            <ProfileContent
                role={profile.role}
                savedOrgs={savedOrgs}
                savedEvents={savedEvents}
                upcomingEvents={upcomingEvents}
                pastEvents={pastEvents}
                onPostClick={(post) => {
                    setSelectedPost(post);
                    setIsOpen(true);
                }}
            />

            <AnimatePresence>
                {isOpen && selectedPost && (
                    <PostingDetailModal
                        setIsOpen={setIsOpen}
                        selectedPost={selectedPost}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}
