"use client";

import { getLevelInfo } from "@/lib/progress";

export default function UserAvatar({ user }) {
  const info = getLevelInfo(user.experience)
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
          <span className="text-primary-foreground text-lg font-bold">
            <img src={user.avatar} className="rounded-full"/>
          </span>
        </div>
        {/* Level chevron */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-black text-xs font-bold">
          <div className="flex flex-col items-center">
            <div
              className="w-5 h-6 bg-yellow-500 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%)",
              }}
            >
              <span className="text-xs font-bold mb-1">{info.level}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{info.name}</p>
      </div>
    </div>
  );
}
