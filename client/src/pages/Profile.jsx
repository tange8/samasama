import React, { useState, useEffect } from 'react';
import ProfileBio from '../components/features/ProfileBio';
import ProfileContent from '../components/features/ProfileContent';
import { useAuth } from '../context/AuthContext';

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [savedOrgs, setSavedOrgs] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    // debug role switcher
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
                const cleaned = data.map(item => {
                    const group = item.groups;

                    return {
                        id: group.id,
                        name: group.name,
                        description: group.description || 'No description provided',
                        logoUrl: '',
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
                    image_url: item.postings.photo_url,
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
        <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-8 pb-10">

            {/* role switcher */}
            <div className="flex gap-4 justify-center bg-[#FFDCBE] border-2 border-[#FF4F00] p-3 rounded-xl text-[#070154]">
                <span className="font-bold">Test View As:</span>
                <label><input type="radio" checked={currentRole === 'student'} onChange={() => setCurrentRole('student')} /> Student</label>
                <label><input type="radio" checked={currentRole === 'org'} onChange={() => setCurrentRole('org')} /> Org</label>
                <label><input type="radio" checked={currentRole === 'business'} onChange={() => setCurrentRole('business')} /> Business</label>
            </div>

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
            />
        </div>
    );
}