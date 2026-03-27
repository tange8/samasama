// Import components here!
import PostingCard from "../components/features/PostingCard";

export default function Home() {

    const dummyData = [
        {
            id: 1,
            title: "FUSION General Meeting #1",
            description: "Come out to our first general meeting of the quarter!",
            type: "event",
            group_name: "FUSION",
            start_time: "2026-04-02T17:00:00Z",
            end_time: "2026-04-02T21:00:00Z",
            location: "Dr. White Room"
        },
        {
            id: 2,
            title: "Boba Fundraiser!",
            description: "Support our club by buying boba!",
            type: "fundraiser",
            group_name: "7 Leaves Cafe",
            start_time: "2026-04-05T12:00:00Z",
            end_time: "2026-04-05T21:00:00Z",
            location: "7 Leaves Cafe, Irvine"
        }
    ];

    return (
        <div>
            <h1>Home</h1>
        <div className="flex flex-col min-h-screen w-full items-center">
            {dummyData.map((post) => (
                <PostingCard key={post.id} posting={post} />
            ))}
        </div>
        </div>
    )
}