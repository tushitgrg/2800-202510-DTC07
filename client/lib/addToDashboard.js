import { ServerUrl } from "./urls";

export const addToDashboard = async (resourceId) => {
  try {
    const response = await fetch(`${ServerUrl}/resources/${resourceId}/add`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add resource");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
