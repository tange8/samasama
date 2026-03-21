export default function OrgSignup () {
    return (
        <div className="flex flex-col items-center h-[607px] w-[640px] bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px]">
            <h1 className="mt-[37px] text-[32px] font-extrabold">Create Account</h1>
            <div className="flex flex-col mt-[11px]">
                <h2 className="text-[#070154] text-[24px]">Name</h2>
                <input className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"/>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="text-[#070154] text-[24px]">Email Address</h2>
                <input className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"/>
            </div>
            <div className="flex flex-col mt-8.5">
                <h2 className="text-[#070154] text-[24px]">Password</h2>
                <input className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"/>
            </div>
            <div className="flex flex-col mt-8.5">
                <h2 className="text-[#070154] text-[24px]">Organization</h2>
                <input type="" className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"/>
            </div>
            <button className="w-50 h-[50px] bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[31px]">
                <h2 className="text-[24px] text-[#070154]">Create Account</h2>
            </button>
        </div>
    )
}