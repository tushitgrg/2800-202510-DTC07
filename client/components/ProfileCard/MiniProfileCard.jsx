"use client";

import UserAvatar from "./UserAvatar";
import UserStats from "./UserStats";
import ExperienceBar from "./ExperienceBar";
import BadgeCollection from "./BadgeCollection";
import { useEffect, useState } from "react";
import { ClientUrl, ServerUrl } from "@/lib/urls";
import { getUserClient } from "@/lib/clientAuth";

export default function MiniProfileCard({resources}) {
  const [user, setuser] = useState(null)
  useEffect(()=>{
getUserClient().then((us)=>{
  setuser(us)
})
  },[])

  return (
    <>
      {user && <div className="w-full mb-8 border rounded-xl p-6 bg-gradient-to-r from-background to-primary/5">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between md:items-center flex-wrap md:flex-nowrap gap-6">
            {/* User avatar and info */}
            <UserAvatar user={user} />

            {/* User stats */}
            <UserStats user={user} />

            {/* Experience bar */}
            <ExperienceBar user={user} />
          </div>
          {/* Badge Collection */}
          {/* <BadgeCollection /> */}
        </div>

      </div>}
    </>

  );
}
