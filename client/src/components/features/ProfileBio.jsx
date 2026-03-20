export default function ProfileBio(profile) {
    let tags = profile.tags.map((tag) =>
	<p class="font-light border-[2px] border-[#FF9B00] rounded-[10px] p-1 px-2">
	    {tag}
	</p>
    )
    let emailImage = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 20V4H22V20H2ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z" fill="black"/></svg>

    return (
	<div class="bg-[#FFDCBE] w-full h-100 border-[3px] border-[#FF4F00] rounded-[6px] flex flex-col justify-between p-4">
	    <div class="flex content-start items-center gap-4 px-2 p-4">
		<img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" class="w-[150px] h-[150px] rounded-[20px]"/>
		<div class="flex flex-col justify-between h-full">
		    <h1 class="font-bold text-5xl">{profile.name}</h1>
		    <h2 class="text-lg">{profile.role}</h2>
		    <div class="flex gap-4">
			{tags}
		    </div>
		</div>
	    </div>
	    <div class="w-full h-[1px] bg-black" />
	    <div class="flex justify-between">
		<div class="flex flex-col w-full gap-4">
		    <p class="w-full text-2xl">
			Contact Information
		    </p>
		    <div class="flex gap-2 items-center">
			{emailImage}
			<p class="text-xl">
			    Email: {profile.email}
			</p>
		    </div>
		</div>
		<div class="flex flex-col w-full gap-4">
		    <p class="w-full text-2xl">
			Socials
		    </p>
		    <div class="flex gap-2 items-center">
			{emailImage}
			<p class="text-xl">
			    Email: {profile.email}
			</p>
		    </div>
		</div>
	    </div>
	    <div class="w-full h-[1px] bg-black" />
	    <div>
		<p>
		    About
		</p>
	    </div>
	</div>
    );
}
