import React, { useState, useEffect } from 'react';
import ProfileBio from '../components/features/ProfileBio';
import ProfileContent from '../components/features/ProfileContent';

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [savedOrgs, setSavedOrgs] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    // debug role switcher
    const [currentRole, setCurrentRole] = useState('student');

    useEffect(() => {
        const userId = '69fd2ffd-7059-4c09-93ba-5c7423fcaa59'; // hardcoded id for now

	fetch(`http://localhost:3000/api/profiles/users/${userId}`)
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

        fetch(`http://localhost:3000/api/profiles/user/${userId}/follows`)
            .then(res => res.json())
	.then(data => {
	  const cleaned = data.map(item => {
	    const group = item.groups;

	    return {
	      id: group.id,
	      name: group.name,
	      description: group.description || 'No description provided',

	      // hardcoded defaults for now (since DB doesn't have them yet)
	      logoUrl: '',
	      type: group.entity_type === 'organization' ? 'Organization' : 'Group',
	      meeting_time: 'Unknown',   // placeholder until DB supports it
	      location: 'Unknown'      // placeholder until DB supports it
	    };
	  });

	  setSavedOrgs(cleaned);
	})
	.catch(console.error);


        // fetch(`http://localhost:3000/api/profiles/user/${userId}/saved`)
        //     .then(res => res.json())
        //     .then(data => setSavedEvents(data))
        //     .catch(console.error);
    }, []);

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
