import GroupCard from './GroupCard';
import PostingCard from './PostingCard';
import { Link } from 'react-router-dom';

export default function ProfileContent({
    role,
    savedOrgs,
    savedEvents,
    groupEvents = [],
    onPostClick
}) {
    if (role === 'student') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6 mx-6">

                {/* Saved Organizations */}
                <div className="w-full bg-white rounded-2xl p-5 flex flex-col min-h-[500px] shadow-md">
                    <h2 className="text-xl font-black text-[#070154] text-center mb-6">
                        Saved Organizations
                    </h2>

                    <div className="flex flex-col gap-4 flex-grow">
                        {savedOrgs?.map(org => (
                            <GroupCard key={org.id} group={org} />
                        ))}
                    </div>
                </div>

                {/* Saved Events */}
                <div className="w-full bg-white rounded-2xl p-5 flex flex-col min-h-[500px] shadow-md">
                    <h2 className="text-xl font-black text-[#070154] text-center mb-6">
                        Saved Events
                    </h2>

                    <div className="flex flex-col gap-4 flex-grow">
                        {savedEvents?.slice(0, 3).map(event => (
                            <div
                                key={event.id}
                                onClick={() => onPostClick(event)}
                                className="cursor-pointer"
                            >
                                <PostingCard posting={event} />
                            </div>
                        ))}
                    </div>

                    {savedEvents?.length > 3 && (
                        <Link
                            to="/events"
                            className="mt-5 text-center text-sm font-semibold text-[#FF4F00] hover:text-[#e04500] transition"
                        >
                            See more →
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    const now = new Date();
    
    const upcomingEvents = groupEvents.filter(event => new Date(event.end_time) >= now);
    const pastEvents = groupEvents.filter(event => new Date(event.end_time) < now);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6 mx-6">

            {/* Upcoming */}
            <div className="w-full bg-[#FFF4EA] border-2 border-[#FF9B00] rounded-2xl p-5 flex flex-col min-h-[500px] shadow-sm">
                <h2 className="text-xl font-black text-[#070154] text-center mb-6">
                    Upcoming Events
                </h2>

                <div className="flex flex-col gap-4 flex-grow">
                    {upcomingEvents.slice(0, 3).map(event => (
                        <div
                            key={event.id}
                            onClick={() => onPostClick(event)}
                            className="cursor-pointer"
                        >
                            <PostingCard posting={event} />
                        </div>
                    ))}
                </div>
                
                {upcomingEvents.length > 3 && (
                    <Link
                        to="/events"
                        className="mt-5 text-center text-sm font-semibold text-[#FF9B00] hover:text-[#e68a00] transition"
                    >
                        See more →
                    </Link>
                )}
            </div>

            {/* Past */}
            <div className="w-full bg-[#FFF4EA] border-2 border-[#FF4F00] rounded-2xl p-5 flex flex-col min-h-[500px] shadow-sm">
                <h2 className="text-xl font-black text-[#070154] text-center mb-6">
                    Past Events
                </h2>

                <div className="flex flex-col gap-4 flex-grow">
                    {pastEvents.slice(0, 3).map(event => (
                        <div
                            key={event.id}
                            onClick={() => onPostClick(event)}
                            className="cursor-pointer"
                        >
                            <PostingCard posting={event} />
                        </div>
                    ))}
                </div>
                
                {pastEvents.length > 3 && (
                    <Link
                        to="/events"
                        className="mt-5 text-center text-sm font-semibold text-[#FF4F00] hover:text-[#e04500] transition"
                    >
                        See more →
                    </Link>
                )}
            </div>
        </div>
    );
}