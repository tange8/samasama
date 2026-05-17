import SignupForm from "../components/features/SignupForm";
import BigLogo from "../assets/samasama_logo2.svg";


export default function Signup() {
    return(

            <div className="flex flex-col items-center justify-center bg-[#FFDCBE] h-full overflow-y-auto flex-1 pb-14 gap-8">
                <img src={BigLogo} alt="" className="w-auto h-24" />
                
                <SignupForm/>
            </div>
        )
}

