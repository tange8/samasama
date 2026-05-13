import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import samasama_logo_long from "../../assets/samasama_logo_long.png";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email && !password) {
            setError("Need email and password to log in");
            return;
        } else if (!email) {
            setError("Need email to log in");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
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
            console.error("Error logging in:", error.message);
        }
    };

    return (
        <div className="w-4/6 rounded-[28px] bg-[#FFF4EA] shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-10 flex flex-col">
	    <a href="/">
		<img src={samasama_logo_long} class="absolute top-10 left-10 cursor-pointer" width="165" />
	    </a>
            
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-[40px] font-black text-[#070154] tracking-tight">
                    Welcome Back
                </h1>

                <p className="text-[#070154]/70 text-[16px]">
                    Log into your account to continue.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-xl bg-[#FF1B29]/10 border border-[#FF1B29]/20 px-4 py-3 text-[#FF1B29] text-sm font-medium">
                    {error}
                </div>
            )}

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
                    placeholder="Enter your password"
                />
            </div>

            {/* Login Button */}
            <button
                className="h-13 rounded-xl bg-[#070154] text-white text-[18px] font-semibold cursor-pointer hover:scale-[1.01] hover:bg-[#12028A] active:scale-[0.99] transition-all"
                onClick={handleLogin}
            >
                Log In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
                <div className="h-px flex-1 bg-[#070154]/10" />
                <span className="text-sm text-[#070154]/50">
                    OR
                </span>
                <div className="h-px flex-1 bg-[#070154]/10" />
            </div>

            {/* Signup */}
            <button
                className="h-13 rounded-xl border border-[#FF9B00]/30 bg-[#FF9B00]/10 text-[#070154] font-semibold hover:bg-[#FF9B00]/20 transition-all"
                onClick={() => navigate("/signup")}
            >
                Create an Account
            </button>
        </div>
    );
}
