export default function MeetTeam() {
    return (
        <div className="flex flex-col items-center w-full p-8 md:p-12">
            
            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Meet the Team</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Welcome to our team page. Here are the people behind the project.
                </p>
            </div>

            {/* Team Members Grid - Responsive layout*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-5xl">
                
                {/* Team Member 1 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-md">
                        <span className="text-gray-500">[Image Placeholder]</span>
                    </div>
                    <h2 className="text-2xl font-semibold">Team Member Name</h2>
                    <h3 className="text-md text-gray-500 italic mb-2">Role / Title</h3>
                    <p className="text-sm text-gray-700">
                        Brief description or bio about the team member goes here.
                    </p>
                </div>

                {/* Team Member 2 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-md">
                        <span className="text-gray-500">[Image Placeholder]</span>
                    </div>
                    <h2 className="text-2xl font-semibold">Team Member Name</h2>
                    <h3 className="text-md text-gray-500 italic mb-2">Role / Title</h3>
                    <p className="text-sm text-gray-700">
                        Brief description or bio about the team member goes here.
                    </p>
                </div>

                {/* Team Member 3 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-md">
                        <span className="text-gray-500">[Image Placeholder]</span>
                    </div>
                    <h2 className="text-2xl font-semibold">Team Member Name</h2>
                    <h3 className="text-md text-gray-500 italic mb-2">Role / Title</h3>
                    <p className="text-sm text-gray-700">
                        Brief description or bio about the team member goes here.
                    </p>
                </div>

            </div>
        </div>
    );
}