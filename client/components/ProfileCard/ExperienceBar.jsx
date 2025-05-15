"use client";

import { getLevelInfo } from "@/lib/progress";

export default function ExperienceBar({user}) {
  const info = getLevelInfo(user.experience)
  return (
    <div className="flex flex-col w-full md:w-auto min-w-[200px]">
      <div className="flex justify-between items-end mb-2">
        <div className="text-sm font-medium">Experience</div>
        <div className="text-xs text-muted-foreground"> ({Math.floor(user.experience)} XP)</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
        <div
          className="bg-gradient-to-r from-primary to-purple-600 h-2.5 rounded-full"
          style={{ width:`${(user.experience/info.nextLevelXp)*100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{Math.floor(info.nextLevelXp - user.experience)} XP to next level</span>
        <span>{Math.floor((user.experience/info.nextLevelXp)*100)}%</span>
      </div>
    </div>
  );
}
