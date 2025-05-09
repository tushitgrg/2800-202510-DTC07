"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/profile";
import Loading from "@/components/Loading";
import { ServerUrl } from "@/lib/urls";

export default function profilePage() {
  const [googleUser, setGoogleUser] = useState(null);

  useEffect(() => {
    fetch(ServerUrl, {
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
          
          window.location.href = `${ServerUrl}/auth/google`;
        }
      });
  }, []);

  if (!googleUser) return <Loading/>;

  return (
    <div>
      <ProfileCard googleUser={googleUser} />
    </div>
  );
}
