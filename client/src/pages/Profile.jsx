import React, { useState } from 'react';
import ProfileBio from '../components/features/ProfileBio';
import ProfileContent from '../components/features/ProfileContent';

export default function Profile() {
    // Simulates the logged-in user's role. 
    // You can toggle this to test how ProfileContent is shown for different roles (student, org, business).
    const [currentRole, setCurrentRole] = useState('student');

    const mockUserBio = {
        profileImage: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
        name: currentRole === 'student' ? "Zuko" : currentRole === 'org' ? "FUSION" : "7 Leaves Cafe",
        role: currentRole === 'org' ? "Professional" : currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
        tags: currentRole === 'student' ? ['CS Major', 'FUSION Member'] : currentRole === 'org' ? ['Professional'] : ['Cafe'],
        email: "example@uci.edu",
        instagram: "https://www.instagram.com",
        linkedin: "https://www.linkedin.com",
        facebook: "https://www.facebook.com",
        youtube: "https://www.youtube.com",
        about: "This is a mocked about section simulating what will eventually come from our Supabase database. It contains information about the user, organization, or business."
    };

    const mockSavedOrgs = [
        {
            id: 1,
            name: "Kababayan",
            description: "Kababayan emphasizes the social, cultural, political, academic and community aspects of the Pilipinx/Pilipinx-American experience.",
            type: "Organization",
            meeting_time: "Thursdays, 7-9PM",
            location: "Dr. White (CCC)",
            logoUrl: ""
        },
        {
            id: 2,
            name: "FUSION",
            description: "FUSION exists to provide a community that fosters the personal and professional growth through the science & engineering field and Filipino culture.",
            type: "Organization",
            meeting_time: "Wednesdays, 7-9PM",
            location: "Dr. White (CCC)",
            logoUrl: ""
        }
    ];

    const mockSavedEvents = [
        {
            id: 1,
            title: "Kababayan General Meeting",
            description: "Come out to our Week 1 general meeting! Get hyped for fun games, yap sessions, and opportunities to meet other general members.",
            type: "event",
            group_name: "Kababayan",
            start_time: "2026-04-02T19:00:00Z",
            end_time: "2026-04-02T21:00:00Z",
            location: "Dr. White (CCC)",
            image_url: ""
        }
    ];

    const mockUpcomingEvents = [
        {
            id: 2,
            title: "FUSION General Meeting #1",
            description: "Come out to our Week 1 General Meeting where you'll have a chance to build and protect your own egg!",
            type: "event",
            group_name: "FUSION",
            start_time: "2026-04-16T19:00:00Z",
            end_time: "2026-04-16T21:00:00Z",
            location: "Dr. White (CCC)",
            image_url: "https://i.redd.it/k5v48axtppqc1.jpeg"
        },
        {
            id: 3,
            title: "Boba Fundraiser!",
            description: "Support our club by buying boba! 15% of proceeds go towards our annual cultural night.",
            type: "fundraiser",
            group_name: "7 Leaves Cafe",
            start_time: "2026-04-20T12:00:00Z",
            end_time: "2026-04-20T21:00:00Z",
            location: "7 Leaves Cafe, Irvine",
            image_url: ""
        }
    ];

    const mockPastEvents = [
        {
            id: 4,
            title: "FUSIONCON 2026",
            description: "Come see our project teams showcase their work!",
            type: "event",
            group_name: "FUSION",
            start_time: "2026-03-15T18:00:00Z",
            end_time: "2026-03-15T22:00:00Z",
            location: "Student Center",
            image_url: ""
        }
    ];

    return (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-8 pb-10">
            
            {/* DEV TOOL: Role Switcher (Remove this once Supabase auth is wired up!) */}
            <div className="flex gap-4 justify-center bg-[#FFDCBE] border-2 border-[#FF4F00] p-3 rounded-xl text-[#070154]">
                <span className="font-bold">Test View As:</span>
                <label className="cursor-pointer"><input type="radio" name="role" checked={currentRole === 'student'} onChange={() => setCurrentRole('student')} className="mr-1 accent-[#FF4F00]" /> Student</label>
                <label className="cursor-pointer"><input type="radio" name="role" checked={currentRole === 'org'} onChange={() => setCurrentRole('org')} className="mr-1 accent-[#FF4F00]" /> Organization</label>
                <label className="cursor-pointer"><input type="radio" name="role" checked={currentRole === 'business'} onChange={() => setCurrentRole('business')} className="mr-1 accent-[#FF4F00]" /> Business</label>
            </div>

            {/* Top Half: Profile Bio */}
            <div className="w-full">
                <ProfileBio 
                    profileImage={mockUserBio.profileImage}
                    name={mockUserBio.name}
                    role={mockUserBio.role}
                    tags={mockUserBio.tags}
                    email={mockUserBio.email}
                    instagram={mockUserBio.instagram}
                    linkedin={mockUserBio.linkedin}
                    facebook={mockUserBio.facebook}
                    youtube={mockUserBio.youtube}
                    about={mockUserBio.about}
                />
            </div>

            {/* Bottom Half: Profile Content based on role */}
            <div className="w-full">
                <ProfileContent 
                    role={currentRole}
                    savedOrgs={mockSavedOrgs}
                    savedEvents={mockSavedEvents}
                    upcomingEvents={mockUpcomingEvents}
                    pastEvents={mockPastEvents}
                />
            </div>
            
        </div>
    );
}