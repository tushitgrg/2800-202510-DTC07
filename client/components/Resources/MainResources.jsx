"use client";

import { useEffect, useState } from "react";
import ResourceComp from "./ResourceComp";
import { useRouter } from "next/navigation";
import { ServerUrl } from "@/lib/urls";
import Loading from "../Loading";

export default function MainResources({ id }) {
  const router = useRouter();
  const [resourceData, setResourceData] = useState(null);
  const [userData, setUserData] = useState(null);

  // Fetch data when component loads
  useEffect(() => {
    async function getData() {
      try {
        // Get resource data
        const resResource = await fetch(`${ServerUrl}/resources/${id}`, {
          credentials: "include",
        });

        // Get user data to check ownership
        const resUser = await fetch(`${ServerUrl}`, {
          credentials: "include",
        });

        // Handle failed requests
        if (!resResource.ok || !resUser.ok) {
          router.push("/not-found");
          return;
        }

        // Set state
        setResourceData(await resResource.json());
        setUserData(await resUser.json());
      } catch (error) {
        router.push("/not-found");
      }
    }

    getData();
  }, [id, router]);

  return (
    <div>
      {resourceData && userData ? (
        <ResourceComp
          resourceData={resourceData}
          userData={userData}
          goToDashboard={() => router.push("/dashboard")}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
