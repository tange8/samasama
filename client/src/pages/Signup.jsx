import SignupForm from "../components/features/SignupForm";
import BigLogo from "../assets/samasama_logo2.svg";
import AuthBackground from "../components/background/AuthBackground";

export default function Signup() {
    return(
        <AuthBackground>
            <div className="flex flex-col items-center justify-center flex-1 pb-14">
                <img src={BigLogo} alt="" className="w-auto h-24" />
                
                <SignupForm/>
            </div>
        </AuthBackground>
        )
}