import linkedinIcon from "../assets/linkedinIcon.svg";
import samasamaLogo from "../assets/samasama_logo_long.png";
import samasamaLogoMark from "../assets/samasama_logo.svg";

// Auto-import every image in src/assets/team/. Drop a new file in that folder
// and reference it below by filename — no extra import needed.
const teamImages = import.meta.glob("../assets/team/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
});

function teamPhoto(filename) {
    return teamImages[`../assets/team/${filename}`];
}

const teamMembers = [
    {
        name: "Vivienne Anne Catarroja",
        role: "Design Lead",
        year: "4th year",
        pronouns: "she/her",
        major: "Informatics",
        photo: "vivienne.jpg",
        linkedin: "https://www.linkedin.com/in/vivienne-anne-catarroja/",
    },
    {
        name: "Bryant Dang",
        role: "Design Lead",
        year: "4th year",
        pronouns: "he/him",
        major: "Software Engineering",
        photo: "bryant.jpg",
        linkedin: "https://www.linkedin.com/in/bryantdang/",
    },
    {
        name: "Grace Jong",
        role: "Designer",
        year: "4th year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "grace.jpg",
        linkedin: "https://www.linkedin.com/in/gracejong",
    },
    {
        name: "Maiella Nona Nuqui",
        role: "Designer",
        year: "4th year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "maiella.jpg",
        linkedin: "https://www.linkedin.com/in/maiellanuqui",
    },
    {
        name: "Tawann Alvarez",
        role: "Designer",
        year: "3rd year",
        pronouns: "he/him",
        major: "Computer Science",
        photo: "tawann.jpg",
        linkedin: "https://www.linkedin.com/in/tawannalvarez",
    },
    {
        name: "Emily Tang",
        role: "Developer Lead",
        year: "4th year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "emily.jpg",
        linkedin: "https://www.linkedin.com/in/emilytang427/",
    },
    {
        name: "Farin Soriano",
        role: "Developer Lead",
        year: "4th year",
        pronouns: "he/him",
        major: "Computer Science",
        photo: "farin.jpg",
        linkedin: "https://www.linkedin.com/in/farinsoriano/",
    },
    {
        name: "Kalia Miyasaki",
        role: "Developer",
        year: "4th year",
        pronouns: "she/her",
        major: "Computer Science",
        photo: "kalia.jpg",
        linkedin: "https://www.linkedin.com/in/kalia-miyasaki/",
    },
    {
        name: "Sebastian Capuyan",
        role: "Developer",
        year: "4th year",
        pronouns: "he/him",
        major: "Computer Science",
        photo: "seb.jpg",
        linkedin: "https://www.linkedin.com/in/jonsebastiancapuyan/",
    },
    {
        name: "Ethan Chao",
        role: "Developer",
        year: "3rd year",
        pronouns: "he/him",
        major: "Software Engineering",
        photo: "ethan.jpg",
        linkedin: "https://www.linkedin.com/in/ethanchaoo/",
    },
    {
        name: "Mailee Dizon",
        role: "Developer",
        year: "2nd year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "mailee.jpg",
        linkedin: "https://www.linkedin.com/in/mailee-dizon",
    },
    {
        name: "Christopher Walden",
        role: "Developer",
        year: "1st year",
        pronouns: "he/him",
        major: "Software Engineering",
        photo: "chris.jpg",
        linkedin: "https://www.linkedin.com/in/christopher-walden-",
    },
    {
        name: "Julianna Alderete",
        role: "Developer",
        year: "2nd year",
        pronouns: "she/her",
        major: "Computer Science",
        photo: "julianna.jpg",
        linkedin: "https://www.linkedin.com/in/julianna-alderete-133964330",
    },
];

const roleStyles = {
    "Design Lead": {
        chipBorder: "#FF1B29",
        chipBg: "#FFD3D5",
        chipText: "#070154",
    },
    Designer: {
        chipBorder: "#070154",
        chipBg: "#FFDDBE",
        chipText: "#070154",
    },
    Developer: {
        chipBorder: "#FF4F00",
        chipBg: "#FFD9C2",
        chipText: "#070154",
    },
    "Developer Lead": {
        chipBorder: "#FF1B29",
        chipBg: "#FFD3D5",
        chipText: "#070154",
    },
    "Sub Design Lead": {
        chipBorder: "#FF9B00",
        chipBg: "#FFE5C2",
        chipText: "#070154",
    },
    "Sub Developer Lead": {
        chipBorder: "#FF9B00",
        chipBg: "#FFE5C2",
        chipText: "#070154",
    },
};

function Chip({ children, borderColor = "#FF9B00", bgColor = "#FFDDBE", textColor = "#070154" }) {
    return (
        <span
            className="text-xs sm:text-sm border rounded-full px-3 py-1 whitespace-nowrap"
            style={{ borderColor, backgroundColor: bgColor, color: textColor }}
        >
            {children}
        </span>
    );
}

function TeamCard({ member }) {
    const style = roleStyles[member.role] ?? roleStyles.Designer;
    const initials = member.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");
    const photoSrc = teamPhoto(member.photo);

    return (
        <div className="bg-[#FCE3CC] rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
            {/* Headshot */}
            <div className="w-36 h-36 rounded-full overflow-hidden bg-[#FFDDBE] mb-4 flex items-center justify-center">
                {photoSrc ? (
                    <img
                        src={photoSrc}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-3xl font-bold text-[#070154]">{initials}</span>
                )}
            </div>

            {/* Name + role */}
            <h2 className="text-xl font-bold text-[#070154] leading-tight">{member.name}</h2>
            <div className="mt-2 mb-3">
                <Chip borderColor={style.chipBorder} bgColor={style.chipBg} textColor={style.chipText}>
                    {member.role}
                </Chip>
            </div>

            {/* Meta chips — Row 1: year + pronouns, Row 2: major (overall card layout: 1 / 2 / 1) */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                    {member.year && <Chip>{member.year}</Chip>}
                    {member.pronouns && <Chip>{member.pronouns}</Chip>}
                </div>
                {member.major && <Chip>{member.major}</Chip>}
            </div>

            {/* Social */}
            {member.linkedin && (
                <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="mt-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-colors duration-300"
                >
                    <img src={linkedinIcon} alt="" className="w-[18px] h-[18px]" />
                </a>
            )}
        </div>
    );
}

export default function MeetTeam() {
    const designLeads = teamMembers.filter(
        (m) => m.role === "Design Lead" || m.role === "Sub Design Lead"
    );
    const designers = teamMembers.filter((m) => m.role === "Designer");
    const devLeads = teamMembers.filter(
        (m) => m.role === "Developer Lead" || m.role === "Sub Developer Lead"
    );
    const developers = teamMembers.filter((m) => m.role === "Developer");

    return (
        <div
            className="flex flex-col items-center w-full h-full overflow-y-auto"
            style={{
                background:
                   "linear-gradient(to bottom, #F0E0C0 0%, #eca886 50%, #f4a05b 80%)",
            }}
        >
            {/*INTRO*/}
            <section className="w-full max-w-5xl px-6 md:px-12 pt-12 pb-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#070154] mb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                        <span>What is</span>
                        <img
                            src={samasamaLogoMark}
                            alt="Sama Sama"
                            className="h-10 md:h-14 w-auto inline-block"
                        />
                        <span>?</span>
                    </h1>
                    <div className="h-1 w-24 bg-[#FF9B00] rounded-full mx-auto mb-6" />
                    <p className="text-base md:text-lg text-[#1B1941]/85 max-w-3xl mx-auto leading-relaxed">
                    SamaSama serves as a centralized platform for all news and updates within UCI Kababayan's 
                    {" "}
                        <span className="font-semibold text-[#070154]">Alyansa</span>.
                    While Alyansa offers a wide range of events and programs, fragmented social media updates result in a level of difficulty 
                    for some students. Rather than having to venture to specific social media profiles or coming across these opportunities by 
                    chance, students can use SamaSama to discover events, initiatives, and community resources in one unified, purpose-built platform.


                    </p>
                </div>
            </section>

            {/*FUSION*/}
            <section className="w-full max-w-5xl px-6 md:px-12 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#070154] mb-3">
                        What is <span className="text-[#FF1B29]">FUSION</span>?
                    </h2>
                    <div className="h-1 w-20 bg-[#FF9B00] rounded-full mx-auto" />
                </div>

                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#FCE3CC] mb-6 flex items-center justify-center">
                    {teamPhoto("fusion-group.png") ? (
                        <img
                            src={teamPhoto("fusion-group.png")}
                            alt="FUSION group photo"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-[#1B1941]/60 text-sm">[ FUSION group photo ]</span>
                    )}
                </div>

                {/* FUSION tagline */}
                <p className="text-center text-xl md:text-2xl font-bold text-[#070154] mb-6 leading-snug max-w-3xl mx-auto">
                    Filipinx Undergraduate Scientist-Engineers in an Organized Network
                </p>

                {/* Founding pull-quote */}
                <p className="text-center italic text-white/95 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-12">
                    "Founded in 2001, FUSION at UCI exists to provide a community that enters
                    the personal and professional growth of our members through the engineering
                    field and the Filipinx culture."
                </p>

                <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl md:text-2xl font-bold text-[#070154] mb-4 text-center">
                        Filipinos in the Engineering Community
                    </h3>
                    <div className="space-y-5 text-white text-base md:text-lg leading-relaxed">
                        <p>
                            Filipino Engineers have long been a part of the engineering
                            community. Engineer Procesco Domingo was recognized as one of the
                            first early Filipino civil engineers who graduated in the early
                            1900s and laid the groundwork for the nation's engineering
                            profession. His contributions to early infrastructure and dedication
                            to education paved the way for future generations of Filipino
                            engineers to rise, innovate, and lead.
                        </p>
                        <p className="text-center font-semibold">
                            Today, Filipino engineers span in every adjacent field including
                            design, electronic manufacturing, sustainable energy, etc.
                        </p>
                    </div>
                </div>
            </section>

            {/*STATS*/}
            <section className="w-full max-w-5xl px-6 md:px-12 py-12">
                <p className="text-center text-2xl md:text-4xl font-extrabold text-white leading-snug max-w-4xl mx-auto">
                    Approximately 4.4 Million Filipino Americans reside in the U.S. today, and
                    an even larger unrecorded number covers the globe.
                </p>
                <p className="text-center text-white/95 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-8">
                    While FUSION is one of many Filipinx-American organizations across the
                    country, supporting the foundation of young talented minds is key for
                    fostering our future as gifted scientists and inspiring more.
                </p>
            </section>

            {/*WORD DIV*/}
            <section className="w-full flex flex-col items-center py-12">
                <img
                    src={samasamaLogo}
                    alt="Sama Sama"
                    className="h-24 md:h-32 w-auto"
                />
            </section>

            {/*DESIGN TEAM*/}
            <section className="w-full max-w-6xl px-6 md:px-12 pb-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#070154] mb-3">
                        Design Team
                    </h2>
                    <div className="h-1 w-20 bg-[#FF9B00] rounded-full mx-auto" />
                </div>

                {/* Leads on top */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
                    {designLeads.map((m) => (
                        <TeamCard key={m.name} member={m} />
                    ))}
                </div>

                {/* Designers below */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {designers.map((m) => (
                        <TeamCard key={m.name} member={m} />
                    ))}
                </div>
            </section>

            {/*DEV TEAM*/}
            <section className="w-full max-w-7xl px-6 md:px-12 pb-20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#070154] mb-3">
                        Development Team
                    </h2>
                    <div className="h-1 w-20 bg-[#FF9B00] rounded-full mx-auto" />
                </div>

                {/* Leads on top */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
                    {devLeads.map((m) => (
                        <TeamCard key={m.name} member={m} />
                    ))}
                </div>

                {/* Devs below — 4 across, last 2 centered → overall 2 / 4 / 2 */}
                <div className="flex flex-wrap justify-center gap-8">
                    {developers.map((m) => (
                        <div
                            key={m.name}
                            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
                        >
                            <TeamCard member={m} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}