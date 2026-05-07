import React, { useState, useEffect } from 'react';
import ProfileBio from '../components/features/ProfileBio';
import ProfileContent from '../components/features/ProfileContent';
import { useAuth } from '../context/AuthContext';
import { PostingDetailModal } from '../components/features/PostingDetailModal';
import { AnimatePresence } from 'framer-motion'; //for pop up modal animation

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [savedOrgs, setSavedOrgs] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    // debug role switcher
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [currentRole, setCurrentRole] = useState('student');
    const { user } = useAuth(); // Added useAuth hook

    useEffect(() => {
        // Added guard clause to wait for user to load
        if (!user || !user.id) return;

        // Replaced hardcoded userId with user.id
        fetch(`http://localhost:3000/api/profiles/users/${user.id}`)
            .then(res => res.json())
            .then(data => {
                const mappedProfile = {
                    ...data,
                    name: `${data.first_name} ${data.last_name}`,
                    profile_image: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
                    tags: [],
                    instagram: "",
                    linkedin: "",
                    facebook: "",
                    youtube: "",
                    about: ""
                };

                setProfile(mappedProfile);
            })
            .catch(console.error);

        // Replaced hardcoded userId with user.id
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

        // Replaced hardcoded userId with user.id
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
    }, [user]); // Added user to the dependency array

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col max-w-[1850px] w-full mx-auto gap-8 pb-10 pt-25">
            <h1 className="text-4xl font-semibold text-[#1B1941]">My SamaSama Profile</h1>
            
            <ProfileBio 
                profileImage={profile.profile_image}
                name={profile.name}
                role={profile.role}
                tags={profile.tags || []}
                email={profile.email}
                instagram={profile.instagram}
                linkedin={profile.linkedin}
                facebook={profile.facebook}
                youtube={profile.youtube}
                about={profile.about}
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