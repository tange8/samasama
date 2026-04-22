import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function StudentSignup ({goBack}) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        const names = name.split(" ")

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: names[0],
                    last_name: names[1],
                    role: "student"
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message)
                return
            }

            navigate("/")
        } catch (error) {
            setError(error)
            console.error("Error signing up: ", error);
        }
    }

    return (
        <div className="flex flex-col items-center w-160 bg-[#FFE3CA] border-[3px] border-[#070154] rounded-[11px] relative">
            <button className="absolute top-4 left-4 border-[3px] border-[#FF4F00] rounded-md cursor-pointer" onClick={() => {goBack()}}>
                <IoMdArrowBack size={30}/>
            </button>
            <h1 className="mt-9 text-[32px] font-extrabold">Create Account</h1>
            <div className="flex flex-col mt-[11px]">
                <h2 className="text-[#070154] text-[24px]">Name</h2>
                <input 
                    className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="text-[#070154] text-[24px]">Email Address</h2>
                <input 
                    className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col mt-8.5">
                <h2 className="text-[#070154] text-[24px]">Password</h2>
                <input 
                    className="w-100 h-10 border-[3px] border-[#FF4F00] bg-[#FFDCBE] rounded-md p-1.5"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="w-50 h-[50px] bg-[#FFE3CA] border-[3px] border-[#FF9B00] rounded-[11px] cursor-pointer mt-8.25 mb-[27px]" onClick={() => {handleSubmit()}}>
                <h2 className="text-[24px] text-[#070154]">Create Account</h2>
            </button>
            <h3 className="text-red-600 mb-[27px]">{error}</h3>
        </div>
    )
}