import Gradient1 from "../../assets/auth_gradient1.svg";
import Gradient2 from "../../assets/auth_gradient2.svg";

import { motion } from "framer-motion";

export default function AuthBackground({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#FFDDBE]">
           <motion.img
                src={Gradient1}
                alt=""
                className="absolute -bottom-10 -left-55 w-full h-[576px] z-10"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.img
                src={Gradient2}
                alt=""
                className="absolute top-0 -right-45 w-full h-[600px] z-0"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                {children}
            </div>
        </div>
        
    );
}
  