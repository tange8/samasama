import ProfileContent from '../components/features/ProfileContent';

export default function Profile() {
    // Dummy Data to test the layout
    const dummyOrgs = [
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

    const dummyEvents = [
        {
            id: 1,
            title: "General Meeting",
            description: "Come out to our Week 1 general meeting! Get hyped for fun games, DI yap sessions, and opportunities to meet other general members...",
            group_name: "Kababayan",
            start_time: "2026-04-02T19:00:00Z",
            location: "Dr. White (CCC)"
        },
        {
            id: 2,
            title: "General Meeting",
            description: "Come out to our Week 1 General Meeting where you'll have a chance to build and protect your own egg for FUSION's annual Egg Drop!",
            group_name: "FUSION",
            start_time: "2026-04-01T19:00:00Z",
            location: "Dr. White (CCC)"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Top Half: Placeholder for ProfileBio */}
            <div className="w-full border-4 border-[#F6921E] rounded-xl p-6 mb-6 bg-[#fdfaf5] flex flex-col items-center justify-center min-h-[250px]">
                <p className="text-sm text-gray-500">(Placeholder for ProfileBio)</p>
            </div>

            {/* Bottom Half: Profile Content */}
            <ProfileContent 
                role="student" 
                savedOrgs={dummyOrgs} 
                savedEvents={dummyEvents} 
            />
        </div>
    );
}