import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function StudentSignup({ goBack }) {
    const navigate = useNavigate();
    const { login } = useAuth();

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
                    role: "student",
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
        <div className="w-full max-w-[520px] rounded-[28px] bg-[#FFF4EA] shadow-[0_10px_40px_rgba(0,0,0,0.18)] p-10 relative flex flex-col">
            {/* Back Button */}
            <button
                className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#070154] hover:bg-[#FF9B00]/10 transition-all cursor-pointer"
                onClick={goBack}
            >
                <IoMdArrowBack size={24} />
            </button>

            {/* Header */}
            <div className="flex flex-col gap-3 mb-4 mt-6">
                <h1 className="text-[38px] font-black text-[#070154] leading-none">
                    Student Signup
                </h1>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-xl bg-[#FF1B29]/10 border border-[#FF1B29]/20 px-4 py-3 text-[#FF1B29] text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Name */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="text-[#070154] font-semibold text-[15px]">
                    Full Name
                </label>

                <input
                    className="h-12 rounded-xl bg-white px-4 outline-none border border-transparent focus:border-[#FF9B00] focus:ring-4 focus:ring-[#FF9B00]/15 transition-all"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 mb-5">
                <label className="text-[#070154] font-semibold text-[15px]">
                    Email Address
                </label>

                <input
                    className="h-12 rounded-xl bg-white px-4 outline-none border border-transparent focus:border-[#FF9B00] focus:ring-4 focus:ring-[#FF9B00]/15 transition-all"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 mb-8">
                <label className="text-[#070154] font-semibold text-[15px]">
                    Password
                </label>

                <input
                    className="h-12 rounded-xl bg-white px-4 outline-none border border-transparent focus:border-[#FF9B00] focus:ring-4 focus:ring-[#FF9B00]/15 transition-all"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                />
            </div>

            {/* Submit */}
            <button
                className="h-13 rounded-xl bg-[#FF9B00] text-white text-[18px] font-semibold hover:bg-[#e68c00] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                onClick={handleSubmit}
            >
                Create Account
            </button>
        </div>
    );
}