import { useState } from "react";
import StudentSignup from "./StudentSignup";
import BusinessSignup from "./BusinessSignup";
import OrgSignup from "./OrgSignup";
import { ChevronDown } from "lucide-react";


export default function SignupForm() {
    const [role, setRole] = useState("");
    const [orgSelected, setOrgSelected] = useState("");
    const [dropdown, setDropdown] = useState(false);

    const orgs = ["Kababayan", "FUSION", "PASS", "PUSO"];

    if (role === "student") {
        return <>
	    <a href="/">
		
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
        <div className="w-full max-w-[520px] rounded-[28px] bg-[#FFF4EA] shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-10 flex flex-col">
	    <a href="/">
		
	    </a>

            {/* Header */}
            <div className="flex flex-col gap-3 mb-10">
                <h1 className="text-[38px] font-black text-[#070154] leading-none">
                    Create Account
                </h1>

                <p className="text-[#070154]/60 text-[16px]">
                    Choose how you want to use the platform.
                </p>
            </div>

            {/* Role Cards */}
            <div className="flex flex-col gap-5">

                {/* Student */}
                <button
                    onClick={() => setRole("student")}
                    className="group bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer active:scale-98"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-[24px] font-bold text-[#070154]">
                                Student
                            </h2>

                            <p className="text-[#070154]/60 mt-1">
                                Join clubs, events, and campus communities.
                            </p>
                        </div>

                        <div className="w-4 h-4 rounded-full bg-[#FF9B00] opacity-60 group-hover:scale-125 transition-all" />
                    </div>
                </button>

                {/* Business */}
                <button
                    onClick={() => setRole("business")}
                    className="group bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer active:scale-98"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-[24px] font-bold text-[#070154]">
                                Business
                            </h2>

                            <p className="text-[#070154]/60 mt-1">
                                Promote opportunities and connect with students.
                            </p>
                        </div>

                        <div className="w-4 h-4 rounded-full bg-[#FF4F00] opacity-70 group-hover:scale-125 transition-all" />
                    </div>
                </button>

                {/* Organization */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all active:scale-98">
                    
                    <button
                        onClick={() => setDropdown(!dropdown)}
                        className="w-full p-6 flex justify-between items-center hover:bg-black/[0.02] transition-all cursor-pointer"
                    >
                        <div className="text-left">
                            <h2 className="text-[24px] font-bold text-[#070154]">
                                Organization
                            </h2>

                            <p className="text-[#070154]/60 mt-1">
                                Manage a student organization or club.
                            </p>
                        </div>

			<div
			    className="w-4 h-4 rounded-full bg-[#FF1B29]"
			/>
                    </button>

		    <div
			className={`
			    overflow-hidden transition-all duration-500 ease-in-out
			    ${dropdown
				? "max-h-96 opacity-100 translate-y-0"
				: "max-h-0 opacity-0 -translate-y-2"
			    }
			`}
		    >
                        <div className="px-6 pb-6 flex flex-col gap-3">
                            {orgs.map((item) => {
                                const isSelected = orgSelected === item;

                                return (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setOrgSelected(item);
                                            setRole("org");
                                        }}
                                        className="flex justify-between items-center rounded-xl px-4 py-3 transition-all cursor-pointer border border-transparent hover:bg-black/[0.03] active:scale-98 active:bg-black/[0.05]"
                                    >
                                        <span className="font-medium text-[#070154]">
                                            {item}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
		    </div>
                </div>
            </div>
        </div>
    );
}