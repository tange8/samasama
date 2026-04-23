import React, { useState } from 'react';
import ProfileBio from '../components/features/ProfileBio';
import ProfileContent from '../components/features/ProfileContent';

export default function Profile() {
    // Supabase connection stuff
useEffect(() => {
    // if (!user) return;

    // profile
    fetch('http://localhost:3000/api/profiles/users/69fd2ffd-7059-4c09-93ba-5c7423fcaa59') // TODO: Hardcoded ID for now
	.then(res => res.json())
	.then(setProfile)
	.catch(console.error);

	//    // follows (orgs)
	//    fetch('http://localhost:3000/api/profiles/student/${user.id}/follows')
	// .then(res => res.json())
	// .then(setSavedOrgs);
	//
	//    // saved posts
	//    fetch('http://localhost:3000/api/profiles/student/${user.id}/saved')
	// .then(res => res.json())
	// .then(setSavedEvents);

}, [user]);

    // Simulates the logged-in user's role. 
    // You can toggle this to test how ProfileContent is shown for different roles (student, org, business).
    const [currentRole, setCurrentRole] = useState('student');

        // profileImage: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
        // name: currentRole === 'student' ? "Zuko" : currentRole === 'org' ? "FUSION" : "7 Leaves Cafe",
        // role: currentRole === 'org' ? "Professional" : currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
        // tags: currentRole === 'student' ? ['CS Major', 'FUSION Member'] : currentRole === 'org' ? ['Professional'] : ['Cafe'],
        // email: "example@uci.edu",
        // instagram: "https://www.instagram.com",
        // linkedin: "https://www.linkedin.com",
        // facebook: "https://www.facebook.com",
        // youtube: "https://www.youtube.com",
        // about: "This is a mocked about section simulating what will eventually come from our Supabase database. It contains information about the user, organization, or business."

            // id: 1,
            // name: "Kababayan",
            // description: "Kababayan emphasizes the social, cultural, political, academic and community aspects of the Pilipinx/Pilipinx-American experience.",
            // type: "Organization",
            // meeting_time: "Thursdays, 7-9PM",
            // location: "Dr. White (CCC)",
            // logoUrl: ""

            // id: 3,
            // title: "Boba Fundraiser!",
            // description: "Support our club by buying boba! 15% of proceeds go towards our annual cultural night.",
            // type: "fundraiser",
            // group_name: "7 Leaves Cafe",
            // start_time: "2026-04-20T12:00:00Z",
            // end_time: "2026-04-20T21:00:00Z",
            // location: "7 Leaves Cafe, Irvine",
            // image_url: ""

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
            </div>

            {/* Bottom Half: Profile Content based on role */}
            <div className="w-full">
		<ProfileContent 
		    role={profile.role}
		    savedOrgs={savedOrgs}
		    savedEvents={savedEvents}
		    upcomingEvents={upcomingEvents}
		    pastEvents={pastEvents}
		/>
            </div>
            
        </div>
    );
}
