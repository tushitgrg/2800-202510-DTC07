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

/**
 * AuthButton component
 * Renders a user dropdown menu when authenticated, or a "Get Started" button otherwise.
 * Automatically fetches the current user on mount.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes to apply to the button
 * @returns {JSX.Element} The authentication button or user menu
 */
const AuthButton = ({ className = "" }) => {
  // Local state to hold authenticated user data
  const [user, setUser] = useState(null);

  // On mount, fetch user info from the client API
  useEffect(() => {
    getUserClient().then((data) => {
      setUser(data);
    });
  }, []); // Empty array ensures this runs once on mount

  return (
    <div>
      {user ? (
        // If user is authenticated, show dropdown with account and logout
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`rounded-full border-purple-600 border-2 bg-black/50 text-white py-2 pr-1 pl-3
                hover:bg-black hover:cursor-pointer hover:shadow-[0_0_2px_1px_rgba(168,85,247,0.7)]
                transition duration-300 ${className}`}
            >
              {/* Display user name and avatar */}
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
            {/* Link to profile page */}
            <a href="/profile">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </a>
            {/* Logout action */}
            <a href={`${ServerUrl}/logout`}>
              <DropdownMenuItem>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // If not authenticated, show Get Started button linking to Google auth
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
