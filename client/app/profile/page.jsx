"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/profile";
import Loading from "@/components/Loading";
import { ServerUrl } from "@/lib/urls";

/**
 * Renders the user's profile page.
 * 
 * This component fetches the authenticated user's data using the Google OAuth cookie,
 * then displays a profile card using the <ProfileCard /> component.
 * If the user is not authenticated, it redirects to the Google login page.
 * A loading spinner is shown while user data is being fetched.
 *
 * @returns {JSX.Element} The profilePage component.
 */

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

  if (!googleUser) return <Loading />;

  return (
    <div>
      <ProfileCard googleUser={googleUser} />
    </div>
  );
}
