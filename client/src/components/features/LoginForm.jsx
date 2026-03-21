import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center h-115 w-160 bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px] ">
            <h1 className="mt-9.5 text-[32px] font-extrabold">Log In</h1>
            <div className="flex flex-col mt-4.5">
                <h2 className="text-[#070154] text-[24px]">Email Address</h2>
                <input className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"/>
            </div>
            <div className="flex flex-col mt-6.25">
                <h2 className="text-[#070154] text-[24px]">Password</h2>
                <input className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"/>
            </div>
            <button className="w-37.5 h-12.5 bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] mt-7 cursor-pointer">
                <h2 className="text-[24px] text-[#070154]">Log In</h2>
            </button>

            <button className="w-110 h-12.5 bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] mt-7 mb-9.25 cursor-pointer" onClick={() => navigate("/signup")}>
                <h2 className="text-[24px] text-[#070154]">Don't have an account? Sign up here</h2>
            </button>
        </div>
    )
}