import ProfileBio from "../components/features/ProfileBio"

export default function Profile() {
    return (
	<ProfileBio name="John Doe"
	    role="Business"
	    tags={['Awesome Business Certified', 'FUSION Approved']}
	    email="example@uci.edu"
	    instagram="instagram.com"
	    linkedin="linkedin.com"
	    facebook="facebook.com"
	    youtube="youtube.com"
	    about="Lorem ipsum dolor sit amet"
	/>
    );
}
