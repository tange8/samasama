import LoginForm from "../components/features/LoginForm";
import AuthBackground from "../components/background/AuthBackground";
import BigLogo from "../assets/samasama_logo2.svg";

export default function Login() {
    return(
        <AuthBackground>
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={BigLogo} alt="" className="w-auto h-24" />
                
                <LoginForm/>
            </div>
        </AuthBackground>
    )
}