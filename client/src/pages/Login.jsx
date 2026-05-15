import LoginForm from "../components/features/LoginForm";
import BigLogo from "../assets/samasama_logo2.svg";

export default function Login() {
    return(
        <div className="relative min-h-screen overflow-auto bg-[#FFDDBE] gap-10 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center flex-1 pb-14 gap-5">
                <img src={BigLogo} alt="" className="w-auto h-24" />
                
                <LoginForm/>
            </div>
        </div>
    )
}