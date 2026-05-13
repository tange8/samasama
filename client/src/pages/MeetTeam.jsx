import linkedinIcon from "../assets/linkedinIcon.svg";
const teamMembers = [
    {
        name: "Vivienne Anne Catarroja",
        role: "Design Lead",
        year: "4th year",
        pronouns: "she/her",
        major: "Informatics",
        photo: "/team/vivienne.jpg",
        linkedin: "https://www.linkedin.com/in/vivienne-anne-catarroja/",
    },
    {
        name: "Bryant",
        role: "Sub Design Lead",
        year: "1st year",
        pronouns: "he/him",
        major: "Software Engineering",
        photo: "/team/placeholder3.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-three",
    },
    {
        name: "Grace Jong",
        role: "Designer",
        year: "4th year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "/team/grace.jpg",
        linkedin: "https://www.linkedin.com/in/gracejong",
    },
    {
        name: "Maiella Nona Nuqui",
        role: "Designer",
        year: "4th year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "/team/maiella.jpg",
        linkedin: "https://www.linkedin.com/in/maiellanuqui",
    },
    {
        name: "Tawann Alvarez",
        role: "Designer",
        year: "3rd year",
        pronouns: "he/him",
        major: "Computer Science",
        photo: "/team/tawann.jpg",
        linkedin: "https://www.linkedin.com/in/tawannalvarez",
    },
    {
        name: "Emily Tang",
        role: "Developer Lead",
        year: "4th year",
        pronouns: "",
        major: "Software Eningeering",
        photo: "/team/placeholder1.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-one",
    },
    {
        name: "Farin",
        role: "Sub Developer Lead",
        year: "3rd year",
        pronouns: "she/her",
        major: "Computer Science",
        photo: "/team/placeholder2.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-two",
    },
    {
        name: "Kalia Miyasaki",
        role: "Developer",
        year: "4th year",
        pronouns: "she/her",
        major: "Computer Science",
        photo: "/team/placeholder4.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-four",
    },
    {
        name: "Sebastian Capuyan",
        role: "Developer",
        year: "4th year",
        pronouns: "he/him",
        major: "Computer Science",
        photo: "/team/placeholder6.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-six",
    },
    {
        name: "Ethan Chao",
        role: "Developer",
        year: "3rd year",
        pronouns: "they/them",
        major: "Software Engineering",
        photo: "/team/placeholder7.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-seven",
    },
    {
        name: "Mailee Dizon",
        role: "Developer",
        year: "2nd year",
        pronouns: "she/her",
        major: "Software Engineering",
        photo: "/team/mailee.jpg",
        linkedin: "https://www.linkedin.com/in/mailee-dizon",
    },
    {
        name: "Christopher",
        role: "Developer",
        year: "1st year",
        pronouns: "they/them",
        major: "Software Engineering",
        photo: "/team/placeholder10.jpg",
        linkedin: "https://www.linkedin.com/in/placeholder-ten",
    },
    {
        name: "Julianna",
        role: "Developer",
        year: "",
        pronouns: "she/her",
        major: "",
        photo: "/team/julianna.jpg",
        linkedin: "",
    },
];

const designerRoles = ["Design Lead", "Sub Design Lead", "Designer"];

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

    return (
        <div className="bg-[#FCE3CC] border-[4px] border-[#1B1941] rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
            {/* Headshot */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-[3px] border-[#1B1941] bg-[#FFDDBE] mb-4 flex items-center justify-center">
                <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fall back to initials if the photo path doesn't exist yet.
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.innerHTML = `<span class="text-3xl font-bold text-[#070154]">${initials}</span>`;
                    }}
                />
            </div>

            {/* Name + role */}
            <h2 className="text-xl font-bold text-[#070154] leading-tight">{member.name}</h2>
            <div className="mt-2 mb-3">
                <Chip borderColor={style.chipBorder} bgColor={style.chipBg} textColor={style.chipText}>
                    {member.role}
                </Chip>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Chip>{member.year}</Chip>
                <Chip>{member.pronouns}</Chip>
                <Chip>{member.major}</Chip>
            </div>

            {/* Social */}
            {member.linkedin && (
                <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="mt-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1B1941] text-[#FFDDBE] hover:bg-[#FF1B29] transition-colors duration-300"
                >
                    <img src={linkedinIcon} alt="" className="w-[18px] h-[18px]" />
                </a>
            )}
        </div>
    );
}

export default function MeetTeam() {
    return (
        <div className="flex flex-col items-center w-full p-8 md:p-12 bg-[#FFF4EA] min-h-full">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-[#070154] mb-4">
                    Meet the Team
                </h1>
                <div className="h-1 w-24 bg-[#FF9B00] rounded-full mb-6" />
                <p className="text-base md:text-lg text-[#1B1941]/80">
                    The designers and developers behind Sama Sama — bringing Alyansa's news,
                    events, and opportunities into one home.
                </p>
            </div>

            {/* Designers section: 2 leads on top, 3 designers below */}
            <section className="w-full max-w-6xl mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-[#070154] mb-6 text-center">
                    Designers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
                    {teamMembers
                        .filter((m) => m.role === "Design Lead" || m.role === "Sub Design Lead")
                        .map((member) => (
                            <TeamCard key={member.name} member={member} />
                        ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers
                        .filter((m) => m.role === "Designer")
                        .map((member) => (
                            <TeamCard key={member.name} member={member} />
                        ))}
                </div>
            </section>

            {/* Developers section: 4 + 4 */}
            <section className="w-full max-w-7xl">
                <h2 className="text-2xl md:text-3xl font-bold text-[#070154] mb-6 text-center">
                    Developers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers
                        .filter((m) => !designerRoles.includes(m.role))
                        .map((member) => (
                            <TeamCard key={member.name} member={member} />
                        ))}
                </div>
            </section>
        </div>
    );
}