"use client";
import { ServerUrl } from "./urls";

/**
 * Retrieves the authenticated user on the client side by fetching the root endpoint.
 *
 * @async
 * @function getUserClient
 * @returns {Promise<Object|null>} A promise resolving to the user data object if successful, or null if unauthenticated or on error.
 */
export async function getUserClient() {
  try {
    // Send request to root endpoint with credentials to include HTTP-only cookies
    const res = await fetch(`${ServerUrl}/`, {
      credentials: "include",
    });

    // If the response is not OK, assume user is not authenticated
    if (!res.ok) return null;

    const data = await res.json();
    // Return the user object only if an _id field exists
    return data._id ? data : null;
  } catch (error) {
    // Network or parsing failure. Treat as unauthenticated
    console.error("getUserClient error:", error);
    return null;
  }
}
