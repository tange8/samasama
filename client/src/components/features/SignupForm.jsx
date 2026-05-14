import { useState } from "react";
import StudentSignup from "./StudentSignup";
import BusinessSignup from "./BusinessSignup";
import OrgSignup from "./OrgSignup";
import { ChevronDown } from "lucide-react";
import samasama_logo_long from "../../assets/samasama_logo_long.png";

const buttonBase = "bg-gradient-to-b from-[#FFE3CA] to-[#F3923B] hover:from-[#F3923B] transition-colors duration-300"

export default function SignupForm() {
    const [role, setRole] = useState("");
    const [orgSelected, setOrgSelected] = useState("");
    const [dropdown, setDropdown] = useState(false);

    const orgs = ["Kababayan", "FUSION", "PASS", "PUSO"];

    if (role === "student") {
        return <>
	    <a href="/">
		<img src={samasama_logo_long} class="absolute top-10 left-10 cursor-pointer" width="165" />
	    </a>
            <StudentSignup
                goBack={() => {
                    setRole("");
                }}
            />
        </>;
    }

    if (role === "business") {
        return <>
	    <a href="/">
		<img src={samasama_logo_long} class="absolute top-10 left-10 cursor-pointer" width="165" />
	    </a>
            <BusinessSignup
                goBack={() => {
                    setRole("");
                }}
            />
        </>;
    }

    if (role === "org") {
        return <>
	    <a href="/">
		<img src={samasama_logo_long} class="absolute top-10 left-10 cursor-pointer" width="165" />
	    </a>
            <OrgSignup
                org={orgSelected}
                goBack={() => {
                    setRole("");
                    setOrgSelected("");
                }}
            />
        </>;
    }

    return (
        <>
            {select ? (
                <div className="flex flex-col items-center h-[440px] w-160 bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px] overflow-visible">
                    <h1 className="mt-6 text-[32px] font-extrabold">Select Role</h1>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[28px] hover:from-[#F3923B] transition-colors duration-300 } ${(role === "student") ? "bg-[#F3923B]" : "bg-gradient-to-b from-[#FFE3CA] to-[#F3923B]"}`} onClick={() => {setDropDown(false); role === "student" ? setRole("") : setRole("student")}}>
                        <h2 className="text-[20px] text-[#070154]">Student</h2>
                    </button>
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[24px] hover:from-[#F3923B] transition-colors duration-300 } ${(role === "business") ? "bg-[#F3923B]" : "bg-gradient-to-b from-[#FFE3CA] to-[#F3923B]"}`} onClick={() => {setDropDown(false); role === "business" ? setRole("") : setRole("business")}}>
                        <h2 className="text-[20px] text-[#070154]">Business</h2>
                    </button>
                    <div className="relative">
                    <button className={`w-75 h-15 border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[24px] hover:from-[#F3923B] transition-colors duration-300 } ${(role === "org") ? "bg-[#F3923B]" : "bg-gradient-to-b from-[#FFE3CA] to-[#F3923B]"}`} 
                        onClick={() => {setDropDown(!dropdown)}}
                    >
                        <h2 className="text-[20px] text-[#070154]">Organization</h2>
                    </button>
                        {dropdown && (
                            <div className="absolute top-full -mt-3 bg-[#FFE3CA] border-[#FF9B00] border-[3px] w-[300px] rounded-b-[11px] pt-[16px] pb-[10px]">
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
                                                <h3 className="text-[16px]">{item}</h3>
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
                </button>

                {/* Organization */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all active:scale-98">
                    
                    <button
                        className={`${buttonBase} w-30 h-12 bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-[27px] ml-[454px]`}
                        onClick={handleNext}
                    >
                        <h2 className="text-[18px] text-[#070154]">Next</h2>
                    </button>
                    {errMsg && (
                        <p className="text-red-600 mb-3">{errMsg}</p>   
                    )}
                </div>
            </div>
        </div>
    );
}
