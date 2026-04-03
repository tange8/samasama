import GroupCard from './GroupCard';
import PostingCard from './PostingCard';

export default function ProfileContent({ role, savedOrgs, savedEvents, upcomingEvents, pastEvents }) {
    if (role === 'student') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
                {/* Left Column: Saved Organizations */}
                <div className="w-full border-4 border-[#1B1941] rounded-xl p-4 bg-transparent flex flex-col h-full min-h-[500px]">
                    <h2 className="text-xl font-bold text-center text-[#1B1941] mb-6">Saved Organizations</h2>
                    <div className="flex flex-col gap-4 flex-grow">
                        {savedOrgs?.map(org => (
                            <GroupCard key={org.id} group={org} />
                        ))}
                    </div>
                </div>

                {/* Right Column: Saved Events */}
                <div className="w-full border-4 border-[#EE3F38] rounded-xl p-4 bg-transparent flex flex-col h-full min-h-[500px]">
                    <h2 className="text-xl font-bold text-center text-[#1B1941] mb-6">Saved Events</h2>
                    <div className="flex flex-col gap-4 flex-grow">
                        {savedEvents?.map(event => (
                            <PostingCard key={event.id} posting={event} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Organization / Business Role
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
            {/* Left Column: Upcoming Events */}
            <div className="w-full border-4 border-[#1B1941] rounded-xl p-4 bg-transparent flex flex-col h-full min-h-[500px]">
                <h2 className="text-xl font-bold text-center text-[#1B1941] mb-6">Upcoming Events</h2>
                <div className="flex flex-col gap-4 flex-grow">
                    {upcomingEvents?.map(event => (
                        <PostingCard key={event.id} posting={event} />
                    ))}
                </div>
            </div>

            {/* Right Column: Past Events */}
            <div className="w-full border-4 border-[#EE3F38] rounded-xl p-4 bg-transparent flex flex-col h-full min-h-[500px]">
                <h2 className="text-xl font-bold text-center text-[#1B1941] mb-4">Past Events</h2>
                <div className="flex flex-col gap-4 flex-grow">
                    {pastEvents?.map(event => (
                        <PostingCard key={event.id} posting={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}