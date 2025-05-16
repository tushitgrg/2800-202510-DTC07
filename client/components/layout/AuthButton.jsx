"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ChevronRight, LogOut } from "lucide-react";
import { getUserClient } from "@/lib/clientAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ServerUrl } from "@/lib/urls";
import Image from "next/image";

const AuthButton = ({ className = "" }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserClient().then(setUser);
  }, []);

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`rounded-full border-purple-600 border-2 bg-black/50 text-white py-2 pr-1 pl-3
                        hover:bg-black hover:cursor-pointer
                          hover:shadow-[0_0_2px_1px_rgba(168,85,247,0.7)] 
                          transition duration-300
                          ${className}`}
            >
              {user.name}
              <Image
                src={user.avatar}
                className="rounded-full w-7 h-7 ml-2"
                width={100}
                height={100}
                alt={user.name}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <a href="/profile">
              {" "}
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </a>
            <a href={`${ServerUrl}/logout`}>
              <DropdownMenuItem>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <a href={`${ServerUrl}/auth/google`}>
          <Button className={`rounded-full hover:cursor-pointer ${className}`}>
            Get Started
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </a>
      )}
    </div>
  );
};

export default AuthButton;
