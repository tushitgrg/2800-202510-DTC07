import { ServerUrl } from "./urls";

/**
 * Sends a request to add a resource to the user's dashboard.
 *
 * @async
 * @function addToDashboard
 * @param {string} resourceId - The unique identifier of the resource to add
 * @returns {Promise<Object>} The JSON response from the server on success
 * @throws {Error} If the network request fails or the server returns a non-OK status
 */
export const addToDashboard = async (resourceId) => {
  try {
    // Construct the POST endpoint URL and include cookies for authentication
    const response = await fetch(
      `${ServerUrl}/resources/${resourceId}/add`,
      {
        method: "POST",
        credentials: "include", // send browser cookies for session auth
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add resource");
    }

    // Parse and return the JSON payload
    return await response.json();
  } catch (error) {
    console.error("Error adding resource to dashboard:", error);
    throw error;
  }
};