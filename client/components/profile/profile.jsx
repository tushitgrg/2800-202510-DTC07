"use client";

import { useState } from "react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileCard({ googleUser = {} }) {
  // Initialize state variables with default values
  const [displayName, setDisplayName] = useState(googleUser.displayName || "Your display name");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(googleUser.email || "");
  const [school, setSchool] = useState("");

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

  // set proper save handling -> send data to backend route?
  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName || "no username",
          firstName,
          lastName,
          email,
          school,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsEditing(false);
      } else {
        alert("Save failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Save failed: " + error.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl">
          👤
        </div>
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
          <Input
            id="school"
            value={school}
            disabled={!isEditing}
            className="rounded-full mt-1"
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button> {/* ADD PROPER SAVE HANDLING with onClick={handleSave} */}
          </>
        ) : (
          <Button onClick={handleEdit} className="rounded-full">Edit</Button>
        )}
      </CardFooter>
    </Card>
  );
}
