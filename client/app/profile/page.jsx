import ProfileCard from "@/components/profile/profile";

export default function profilePage() { //add fake google user
  const fakeGoogleUser = {
    name: "Tracy Brain",
    email: "iq79@example.com",
  };

  return (
    <div>
      <ProfileCard googleUser={fakeGoogleUser} />
    </div>
  );
}
