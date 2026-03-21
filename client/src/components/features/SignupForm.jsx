import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSignup from "./StudentSignup";
import BusinessSignup from "./BusinessSignup";
import OrgSignup from "./OrgSignup";

export default function SignupForm() {
    const [role, setRole] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [select, setSelect] = useState(true);

    const handleNext = () => {
        if (role) {
            setSelect(false);
        } else {
            setErrMsg("Must select a role before moving forward")
        }
    }

    return (
        <>
            {select ? (
                <div className="flex flex-col items-center h-110 w-160 bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px]">
                    <h1 className="mt-6 text-[32px] font-extrabold">Select Role</h1>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[34px] ${(role === "student") ? "bg-[#FF9B00]/50" : "bg-[#FFE3CA]"}`} onClick={() => {role === "student" ? setRole("") : setRole("student")}}>
                        <h2 className="text-[24px] text-[#070154]">Student</h2>
                    </button>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[30px] ${(role === "business") ? "bg-[#FF9B00]/50" : "bg-[#FFE3CA]"}`} onClick={() => {role === "business" ? setRole("") : setRole("business")}}>
                        <h2 className="text-[24px] text-[#070154]">Business</h2>
                    </button>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[30px] ${(role === "org") ? "bg-[#FF9B00]/50" : "bg-[#FFE3CA]"}`} onClick={() => {role === "org" ? setRole("") : setRole("org")}}>
                        <h2 className="text-[24px] text-[#070154]">Organization</h2>
                    </button>
                    <button className="w-37.5 h-12.5 bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[27px] ml-[454px]">
                        <h2 className="text-[24px] text-[#070154]" onClick={handleNext}>Next</h2>
                    </button>
                    {errMsg && (
                        <p className="text-red-600 mb-3 mt-2">{errMsg}</p>   
                    )}
                </div>
            ) : 
                <>
                    {role === "student" && <StudentSignup/>}
                    {role === "business" && <BusinessSignup/>}
                    {role === "org" && <OrgSignup/>}
                </>
            }
        </>
    )
}