export default function PostingCard({ posting }) {
    const formatTime = (timeString) => {
        if (!timeString) return null;
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
        return new Date(timeString).toLocaleDateString('en-US', options);
    };

    return (
        <div>
        </div>
    );
}