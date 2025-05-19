"use client"; // Indicates this is a Client Component.

import { useEffect, useState } from "react"; // React hooks.
import ResourceComp from "./ResourceComp"; // Component to show resource details.
import { useRouter } from "next/navigation"; // Hook for navigation.
import { ServerUrl } from "@/lib/urls"; // Base URL for API calls.
import Loading from "../Loading"; // Loading spinner component.

/**
 * MainResources Component
 * Fetches and displays a specific resource and user data. Handles loading and errors.
 * @param {Object} props - Component props.
 * @param {string} props.id - The ID of the resource to display.
 */
export default function MainResources({ id }) {
  const router = useRouter(); // Initialize Next.js router.
  const [resourceData, setResourceData] = useState(null); // State for resource data.
  const [userData, setUserData] = useState(null); // State for user data.

  // Fetches resource and user data when the component loads or ID changes.
  useEffect(() => {
    async function getData() {
      try {
        // Fetch resource and user data from the server.
        const [resResource, resUser] = await Promise.all([
          fetch(`${ServerUrl}/resources/${id}`, { credentials: "include" }),
          fetch(`${ServerUrl}`, { credentials: "include" }),
        ]);

        // If either fetch fails, redirect to a not-found page.
        if (!resResource.ok || !resUser.ok) {
          router.push("/not-found");
          return;
        }

        // Update state with fetched data.
        setResourceData(await resResource.json());
        setUserData(await resUser.json());
      } catch (error) {
        // Redirect on any error during fetch.
        console.error("Data fetching failed:", error);
        router.push("/not-found");
      }
    }

    getData(); // Run the data fetching function.
  }, [id, router]); // Dependencies: re-run if `id` changes.

  return (
    <div>
      {/* Show the resource component if data is loaded, otherwise show a loading spinner. */}
      {resourceData && userData ? (
        <ResourceComp
          resourceData={resourceData}
          userData={userData}
          goToDashboard={() => router.push("/dashboard")} // Navigates to dashboard.
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}