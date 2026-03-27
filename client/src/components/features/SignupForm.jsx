import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSignup from "./StudentSignup";
import BusinessSignup from "./BusinessSignup";
import OrgSignup from "./OrgSignup";

export default function SignupForm() {
    const [role, setRole] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [select, setSelect] = useState(true);
    const [orgSelected, setOrgSelected] = useState("");
    const [dropdown, setDropDown] = useState(false)
    console.log(role)

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
                <div className="flex flex-col items-center h-[440px] w-160 bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px] overflow-visible">
                    <h1 className="mt-6 text-[32px] font-extrabold">Select Role</h1>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[34px] ${(role === "student") ? "bg-[#FF9B00]/50" : "bg-[#FFE3CA]"}`} onClick={() => {setDropDown(false); role === "student" ? setRole("") : setRole("student")}}>
                        <h2 className="text-[24px] text-[#070154]">Student</h2>
                    </button>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[30px] ${(role === "business") ? "bg-[#FF9B00]/50" : "bg-[#FFE3CA]"}`} onClick={() => {setDropDown(false); role === "business" ? setRole("") : setRole("business")}}>
                        <h2 className="text-[24px] text-[#070154]">Business</h2>
                    </button>
                    <div className="relative">
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[30px] ${(role === "org") ? "bg-[#FF9B00]/50" : "bg-[#FFE3CA]"}`} 
                        onClick={() => {setDropDown(!dropdown)}}
                    >
                        <h2 className="text-[24px] text-[#070154]">Organization</h2>
                    </button>
                        {dropdown && (
                            <div className="absolute top-full -mt-3 bg-[#FFE3CA] border-[#FF9B00] border-[3px] w-[300px] rounded-b-[11px] pt-[16px] pb-[25px]">
                                <div className="flex flex-col gap-[5px]">
                                {["Kababayan", "FUSION", "PASS", "PUSO"].map((item) => {
                                    const orgColors = {
                                        Kababayan: "#070154",
                                        FUSION: "#FF4F00",
                                        PASS: "#FF9B00",
                                        PUSO: "#FF1B29"
                                    }

                                    const isSelected = orgSelected === item

                                    return (
                                        <div
                                            className="cursor-pointer ml-[38px]"
                                            key={item}
                                            onClick={() => {
                                                setOrgSelected(item)
                                                setRole("org")
                                                setDropDown(false)
                                            }}
                                        >
                                            <div className="flex flex-row justify-between mr-[21px] items-center">
                                                <h3 className="text-[20px]">{item}</h3>
                                                <div 
                                                    className={`border-[3px] h-[20px] w-[20px] rounded-xs`}
                                                    style={{ 
                                                        backgroundColor: isSelected && orgColors[item],
                                                        borderColor: orgColors[item]
                                                    }}
                                                />
                                            </div>
                                        </div>
                                )})}
                                </div>
                            </div>
                        )}  
                    </div>
                    <button className="w-37.5 h-12.5 bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[27px] ml-[454px]">
                        <h2 className="text-[24px] text-[#070154]" onClick={handleNext}>Next</h2>
                    </button>
                    {errMsg && (
                        <p className="text-red-600 mb-3 mt-2">{errMsg}</p>   
                    )}
                </div>
            ) : 
                <>
                    {role === "student" && <StudentSignup goBack={() => { setSelect(true); setRole("")}}/>}
                    {role === "business" && <BusinessSignup goBack={() => { setSelect(true); setRole("")}}/>}
                    {role === "org" && <OrgSignup org={orgSelected} goBack={() => { setSelect(true); setRole("")}}/>}
                </>
            }
        </>
    )
}