import ProfileBio from "../components/features/ProfileBio"

export default function Profile() {
    return (
	<ProfileBio
	    profileImage = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
	    name="John Doe"
	    role="Business"
	    tags={['Awesome Business Certified', 'FUSION Approved']}
	    email="example@uci.edu"
	    instagram="https://www.instagram.com"
	    linkedin="https://www.linkedin.com"
	    facebook="https://www.facebook.com"
	    youtube="https://www.youtube.com"
	    about="Lorem ipsum dolor sit amet"
	/>
    );
}
