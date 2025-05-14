import { ServerUrl } from "./urls";

export const updateResourceProgress = async (resourceId, progressData) => {
  try {
    const response = await fetch(`${ServerUrl}/progress/${resourceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(progressData),
    });

    if (!response.ok) {
      throw new Error('Failed to update progress');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating progress:', error);
    return null;
  }
};