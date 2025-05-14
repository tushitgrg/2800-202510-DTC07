"use client";

import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";
import ExperienceBar from "./ExperienceBar";
import BadgeCollection from "./BadgeCollection";

export default function MiniProfileCard({ resources }) {
  return (
    <div className="w-full mb-8 border rounded-xl p-6 bg-gradient-to-r from-background to-primary/5">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between md:items-center flex-wrap md:flex-nowrap gap-6">
          {/* User avatar and info */}
          <UserAvatar resources={resources} />

          {/* User stats */}
          <UserStats resources={resources} />

          {/* Experience bar */}
          <ExperienceBar />
        </div>
        {/* Badge Collection */}
        <BadgeCollection />
      </div>
    </div>
  );
}
