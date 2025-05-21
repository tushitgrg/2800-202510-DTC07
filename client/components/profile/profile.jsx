"use client";

import { useState, useEffect, useMemo } from "react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServerUrl } from "@/lib/urls";
import toast from "react-hot-toast";

//add debounce function to let user finish entering first
function debounce(cb, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export default function ProfileCard({ googleUser = {} }) {
  // Initialize state variables with default values
  const [displayName, setDisplayName] = useState(
    googleUser.name || "Your display name",
  );
  const [firstName, setFirstName] = useState(
    googleUser.firstName || "Enter first name",
  );
  const [lastName, setLastName] = useState(
    googleUser.lastName || "Enter last name",
  );
  const [email, setEmail] = useState(googleUser.email || "");
  const [school, setSchool] = useState(googleUser.name || "Enter school");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [avatar, setAvatar] = useState(googleUser.avatar || "");

  // Tracks whether profile is in editing mode (false is read only mode)
  const [isEditing, setIsEditing] = useState(false);
  // Stores the original profile data for reverting changes (with cancel button)
  const [backup, setBackup] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    email: "",
    school: "",
  });
  // The logic of searching school
  const fetchSchools = async (query) => {
    console.log("keyword:", query);
    if (!query) return setSchoolList([]);
    const res = await fetch(`${ServerUrl}/school/search?q=${query}`, {
      credentials: "include",
    });
    // const res = await fetch(`${ServerUrl}/resources/public`, { credentials: "include" });
    const data = await res.json();
    setSchoolList(data);
  };

  const debouncedFetch = useMemo(() => debounce(fetchSchools, 500), []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;

      try {
        const res = await fetch(`${ServerUrl}/api/user/${email}`, {
          credentials: "include",
        });

        if (res.ok) {
          const user = await res.json();
          setDisplayName(
            user.displayName !== undefined
              ? user.displayName
              : user.name || "no username",
          );
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setSchool(user.school || "");
          setAvatar(user.avatar || googleUser.avatar || ""); // Set avatar from user or fallback to Google avatar
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [email]);

  const handleEdit = () => {
    setBackup({ displayName, firstName, lastName, email, school }); // Save previous values in backup object
    setIsEditing(true); // Editing mode "On"
  };

  // Restore previous values when canceling edit
  const handleCancel = () => {
    setDisplayName(backup.displayName);
    setFirstName(backup.firstName);
    setLastName(backup.lastName);
    setEmail(backup.email);
    setSchool(backup.school);
    setIsEditing(false);
  };

  // Send saved data to backend
  const handleSave = async () => {
    try {
      const res = await fetch(`${ServerUrl}/api/user/update`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName || "no username",
          firstName,
          lastName,
          email,
          school: school || "", // allow empty
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast.error(`Save failed: ${text}`, {
          duration: 4000,
          position: "bottom-right",
        });
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setIsEditing(false);
      } else {
        toast.error(`Save failed: ${data.error || "Unknown error"}`, {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(`Save failed: ${error.message || "Unknown error"}`, {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader className="flex flex-col items-center space-y-3">
        {avatar ? (
          <img
            src={avatar}
            alt="User avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl">
            👤
          </div>
        )}

        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            value={displayName}
            disabled={!isEditing}
            className="rounded-full mt-1"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              disabled={!isEditing}
              className="rounded-full mt-1"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              disabled={!isEditing}
              className="rounded-full mt-1"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="rounded-full mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="school">School</Label>
          {isEditing ? (
            <>
              <Input
                id="school"
                value={schoolSearch}
                placeholder="Searching school..."
                className="rounded-full mt-1"
                onChange={(e) => {
                  const value = e.target.value;
                  setSchoolSearch(value);
                  setSchool(value); // Always sync school with search
                  if (value) {
                    debouncedFetch(value);
                  } else {
                    setSchoolList([]);
                  }
                }}
              />
              {schoolList.length > 0 && (
                <div className="border rounded-md max-h-40 overflow-y-auto mt-1">
                  {schoolList.map((s) => (
                    <div
                      key={s.name}
                      className="p-2 cursor-pointer hover:font-bold"
                      onClick={() => {
                        setSchool(s.name);
                        setSchoolSearch(s.name);
                        setSchoolList([]); // Clear dropdown after select
                      }}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Input
              id="school"
              value={school}
              disabled
              className="rounded-full mt-1"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel} className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} className="cursor-pointer">
              Save
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit} className="rounded-full cursor-pointer">
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
