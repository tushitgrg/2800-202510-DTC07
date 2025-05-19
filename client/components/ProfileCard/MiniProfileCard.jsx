"use client"; // Marks this as a Client Component for interactive features.

import UserAvatar from "./UserAvatar"; // Displays user's profile picture and name.
import UserStats from "./UserStats"; // Shows user's activity statistics.
import ExperienceBar from "./ExperienceBar"; // Visualizes user's XP progress.
import BadgeCollection from "./BadgeCollection"; // (Currently commented out) For displaying badges.
import { useEffect, useState } from "react"; // React hooks for component lifecycle and state.
import { getUserClient } from "@/lib/clientAuth"; // Fetches authenticated user data.

/**
 * MiniProfileCard Component
 * Displays a small profile card with user avatar, stats, and experience bar.
 * Fetches user data on component load.
 */
export default function MiniProfileCard({ resources }) {
  // Stores the currently logged-in user's data.
  const [user, setuser] = useState(null);

  // Fetches user data when the component first mounts.
  useEffect(() => {
    getUserClient().then((us) => {
      setuser(us);
    });
  }, []); // Runs only once after initial render.

  // Renders the card only if user data is available.
  return (
    <>
      {user && (
        <div className="w-full mb-8 border rounded-xl p-6 bg-gradient-to-r from-background to-primary/5">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between md:items-center flex-wrap md:flex-nowrap gap-6">
              <UserAvatar user={user} />
              <UserStats user={user} />
              <ExperienceBar user={user} />
            </div>
            {/* <BadgeCollection /> */} {/* Uncomment to show badges */}
          </div>
        </div>
      )}
    </>
  );
}