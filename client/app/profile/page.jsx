"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/profile";

export default function profilePage() {
  const [googleUser, setGoogleUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        if (user && user.email) {
          setGoogleUser({
            name: user.name,
            email: user.email,
          });
        } else {
          
          window.location.href = "http://localhost:3001/auth/google";
        }
      });
  }, []);

  if (!googleUser) return <div>Loading profile...</div>;

  return (
    <div>
      <ProfileCard googleUser={googleUser} />
    </div>
  );
}
