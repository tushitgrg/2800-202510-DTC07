"use client"; // Marks this as a Client Component, enabling interactive features.

import { getLevelInfo } from "@/lib/progress"; // Utility to determine user's level based on experience.
import Image from "next/image"; // Next.js component for optimized image rendering.

/**
 * UserAvatar Component
 * Displays a user's avatar, name, and current level.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.user - User object containing `experience`, `avatar` (URL), and `name`.
 * @returns {JSX.Element} The user's avatar display with level and name.
 */
export default function UserAvatar({ user }) {
  // Get level information (like current level number and tier name) based on user's experience.
  const info = getLevelInfo(user.experience);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        {/* Avatar circle with a gradient background */}
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
          {/* User's profile image */}
          <span className="text-primary-foreground text-lg font-bold">
            <Image
              src={user.avatar} // Source URL for the user's avatar image.
              className="rounded-full" // Makes the image circular.
              width={100} // Defines the intrinsic width of the image for optimization.
              height={100} // Defines the intrinsic height of the image for optimization.
              alt={user.name} // Alt text for accessibility.
            />
          </span>
        </div>
        {/* Level chevron displayed at the bottom of the avatar */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-black text-xs font-bold">
          <div className="flex flex-col items-center">
            <div
              className="w-5 h-6 bg-yellow-500 flex items-center justify-center"
              style={{
                // CSS to create a chevron (arrow) shape for the level badge.
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%)",
              }}
            >
              <span className="text-xs font-bold mb-1">{info.level}</span>{" "}
              {/* Displays the user's current level number. */}
            </div>
          </div>
        </div>
      </div>
      {/* User's name and level tier name */}
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>{" "}
        {/* Displays the user's name. */}
        <p className="text-sm text-muted-foreground">{info.name}</p>{" "}
        {/* Displays the user's level tier name (e.g., "Novice", "Expert"). */}
      </div>
    </div>
  );
}
