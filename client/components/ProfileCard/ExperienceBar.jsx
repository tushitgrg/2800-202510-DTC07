"use client"; // Marks this component as a Client Component, enabling interactivity.

import { getLevelInfo } from "@/lib/progress"; // Imports a utility function to calculate level and XP information.

/**
 * @typedef {Object} User
 * @property {number} experience - The user's current experience points.
 */

/**
 * ExperienceBar Component
 *
 * Displays a user's current experience points, progress towards the next level,
 * and the overall experience bar.
 *
 * @param {Object} props - The component props.
 * @param {User} props.user - The user object containing experience points.
 * @returns {JSX.Element} A div element containing the experience bar UI.
 */
export default function ExperienceBar({ user }) {
  // Get detailed information about the user's current level and next level requirements.
  const info = getLevelInfo(user.experience);

  // Calculate the percentage of progress towards the next level.
  const progressPercentage = (user.experience / info.nextLevelXp) * 100;

  return (
    <div className="flex flex-col w-full md:w-auto min-w-[200px]">
      {/* Experience header with current XP */}
      <div className="flex justify-between items-end mb-2">
        <div className="text-sm font-medium">Experience</div>
        <div className="text-xs text-muted-foreground">
          {" "}
          ({Math.floor(user.experience)} XP)
        </div>
      </div>

      {/* Experience progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
        <div
          className="bg-gradient-to-r from-primary to-purple-600 h-2.5 rounded-full"
          // Dynamically set the width of the progress bar based on user's XP
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* XP remaining to next level and percentage */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {Math.floor(info.nextLevelXp - user.experience)} XP to next level
        </span>
        <span>{Math.floor(progressPercentage)}%</span>
      </div>
    </div>
  );
}