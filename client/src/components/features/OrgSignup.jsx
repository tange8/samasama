import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OrgSignup({ org, goBack }) {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [orgSelected, setOrgSelected] = useState(org);
    const [dropdown, setDropDown] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        const names = name.trim().split(" ");

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: names[0],
                    last_name: names.slice(1).join(" "),
                    role: "org_member",
                    org: orgSelected,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }

            login(data.user);
            navigate("/");
        } catch (error) {
            setError("Something went wrong");
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="flex flex-col gap-2 items-center w-full max-w-[540px] h-[460px] bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px] relative">
            <button className="absolute top-3 left-3 border-[3px] border-[#FF4F00] rounded-md cursor-pointer" onClick={() => {goBack()}}>
                <IoMdArrowBack size={30}/>
            </button>
            <h1 className="mt-7 text-[26px] font-extrabold">Create Account</h1>
            <div className="flex flex-col w-[80%]">
                <h2 className="text-[#070154] text-[18px]">Name</h2>
                <input 
                    className="w-full h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                />
            </div>
            <div className="flex flex-col w-[80%]">
                <h2 className="text-[#070154] text-[18px]">Email Address</h2>
                <input 
                    className="w-full h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
            </div>
            <div className="flex flex-col w-[80%]">
                <h2 className="text-[#070154] text-[18px]">Password</h2>
                <input 
                    className="w-full h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                />
            </div>
            <div className="flex flex-col w-[80%] relative">
                <h2 className="text-[#070154] text-[18px]">Organization</h2>
                <div className="flex flex-row items-center justify-between w-full h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5 cursor-pointer" onClick={() => setDropDown(!dropdown)}>
                    <h2 className="text-[18px]">{orgSelected}</h2>
                    <IoMdArrowDropdown size={45} color="#FF4F00"/>
                </div>
                {dropdown && (
                    <div className="absolute top-full -mt-1 bg-[#FFDCBE] border-[#FF4F00] border-[3px] w-full max-h-[100px] overflow-y-auto rounded-b-md py-3">
                        <div className="flex flex-col gap-2">
                        {["Kababayan", "FUSION", "PASS", "PUSO"].map((item) => {
                            return (
                                <div
                                    className="cursor-pointer ml-5"
                                    key={item}
                                    onClick={() => {
                                        setOrgSelected(item)
                                        setDropDown(false)
                                    }}
                                >
                                    <h2 className="text-[16px]">{item}</h2>
                                </div>
                        )})}
                        </div>
                    </div>
                )}  
            </div>
            <button className="w-44 h-[44px] bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-4 bg-gradient-to-b from-[#FFE3CA] to-[#F3923B] hover:from-[#F3923B] transition-colors duration-300" onClick={() => {handleSubmit()}}>
                <h2 className="text-[20px] text-[#070154]">Create Account</h2>
            </button>
        </div>
    );
}
