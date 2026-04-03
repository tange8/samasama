export default function GroupCard({ group }) {
    return (
        <div className="flex w-full bg-[#FCE3CC] border-[4px] border-[#1B1941] rounded-xl p-5 gap-6 items-center">
            
            {/* Logo Image */}
            <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md bg-[#1B1941]">
                {group.logoUrl ? (
                    <img src={group.logoUrl} alt={group.name} className="object-cover w-full h-full" />
                ) : (
                    <div className="text-white flex flex-col items-center justify-center p-2 text-center">
                         <span className="font-bold text-sm uppercase">{group.name}</span>
                         <span className="text-[10px] uppercase">Logo</span>
                    </div>
                )}
            </div>
            
            {/* Content Section */}
            <div className="flex-grow">
                <h3 className="text-[#1B1941] text-3xl leading-none mb-2">{group.name}</h3>
                <p className="text-[15px] text-[#1B1941] font-medium leading-snug line-clamp-3 pr-4">
                    {group.description}
                </p>
            </div>
            
            {/* Metadata Section */}
            <div className="flex flex-col space-y-3 w-48 shrink-0 font-medium text-[15px] text-[#1B1941]">
                
                {/* Organization Type */}
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EE3F38]">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span className="truncate">{group.type}</span>
                </div>
                
                {/* Time */}
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#F6921E]">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className="truncate">{group.meeting_time}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FBAE17]">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="truncate">{group.location}</span>
                </div>

            </div>
        </div>
    );
}