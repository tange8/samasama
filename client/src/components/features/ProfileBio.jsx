import ProfileBioEditingModal from './ProfileBioEditingModal.jsx';
import { AnimatePresence } from "framer-motion";
import { Pencil, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import instagramIcon from '../../assets/instagramIcon.svg';
import linkedinIcon from '../../assets/linkedinIcon.svg';
import facebookIcon from '../../assets/facebookIcon.svg';

export default function ProfileBio(staticProfile) {
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(staticProfile);

    useEffect(() => {
        setProfile(staticProfile);
    }, [staticProfile]);

    return (
        <div className="relative bg-white w-full m-6 h-auto rounded-[14px] flex flex-col p-6 shadow-md">
            
            {/* Edit button */}
            <div className="absolute top-4 right-4">
                <button
                    className="w-[42px] h-[42px] bg-[#FF1B29] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <Pencil size={18} />
                </button>
            </div>

            {/* Top section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                
                <img
                    src={profile.profileImage}
                    className="w-[140px] h-[140px] rounded-2xl object-cover"
                />

                <div className="flex flex-col gap-2 w-full">
                    <h1 className="font-black text-3xl md:text-4xl text-[#070154] text-center md:text-left">
                        {profile.first_name} {profile.last_name}
                    </h1>

                    <h2 className="text-lg md:text-xl font-semibold text-[#070154]/70 text-center md:text-left">
                        {profile.role}
                    </h2>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-1">
                        {profile.tags?.map((tag) => (
                            <p
                                key={tag}
                                className="text-sm border border-[#FF9B00] bg-[#FFDDBE] rounded-full px-3 py-1 text-[#070154]"
                            >
                                {tag}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Middle section */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Contact */}
                <div className="flex flex-col gap-3 w-full">
                    <p className="text-xl font-semibold text-[#070154]">
                        Contact
                    </p>

                    <div className="flex items-center gap-2 text-[#070154]/80">
                        <Mail size={18} className="text-[#FF4F00]" />
                        <p className="text-sm md:text-base">
                            {profile.email}
                        </p>
                    </div>
                </div>

                {/* Socials */}
                <div className="flex flex-col gap-3 w-full mb-6">
                    <p className="text-xl font-semibold text-[#070154]">
                        Socials
                    </p>

                    <div className="flex gap-4 items-center">
                        <a
                            href={profile.instagram || "https://www.instagram.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-105 transition"
                        >
                            <img src={instagramIcon} className="w-[36px] h-[36px]" />
                        </a>

                        <a
                            href={profile.linked_in || "https://www.linkedin.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-105 transition"
                        >
                            <img src={linkedinIcon} className="w-[36px] h-[36px]" />
                        </a>

                        <a
                            href={profile.facebook || "https://www.facebook.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-105 transition"
                        >
                            <img src={facebookIcon} className="w-[36px] h-[36px]" />
                        </a>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-[#070154]">
                    About
                </h2>

                <p className="text-sm md:text-base text-[#070154]/80 leading-relaxed">
                    {profile.about}
                </p>
            </div>

	    <AnimatePresence>
		{showModal && <ProfileBioEditingModal
		    isVisible={showModal}
		    onClose={() => setShowModal(false)}
		    profile={profile}
		    setProfile={setProfile}
		/>}
	    </AnimatePresence>
        </div>
    );
}
