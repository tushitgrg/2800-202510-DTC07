import { ServerUrl } from "@/lib/urls";

/**
 * Sends an update request for an existing resource to the server.
 *
 * @async
 * @function updateResource
 * @param {Object} resource - Resource update parameters
 * @param {string} resource.editingId - ID of the resource to update
 * @param {string} [resource.editValue] - Temporary edited title value
 * @param {string} [resource.newTitle] - Fallback new title if editValue is not provided
 * @param {Object} [resource.updatedResource] - Existing resource data, used to extract tags
 * @param {string[]} [resource.updatedResource.tags] - Updated tags array
 * @param {string} [resource.newSchool] - New school value (nullable)
 * @param {string} [resource.newCourse] - New course value (nullable)
 * @param {boolean} [resource.isPublic] - Visibility flag for the resource
 * @param {boolean} [resource.isLiked] - Like status for the resource (nullable)
 * @returns {Promise<void>} Resolves if the update succeeds
 * @throws {Error} If the server responds with a non-OK status
 */
const updateResource = async (resource) => {
  // Construct the PUT endpoint URL with the resource ID
  const response = await fetch(
    `${ServerUrl}/resources/${resource.editingId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Determine the new title: use editValue if present, else newTitle or null
        newTitle: resource.editValue
          ? resource.editValue
          : resource.newTitle || null,
        // Use updated tags if available, otherwise default to empty array
        newTags: resource.updatedResource
          ? resource.updatedResource.tags
          : [],
        newSchool: resource.newSchool ?? null, // Nullable new school
        newCourse: resource.newCourse ?? null, // Nullable new course
        // Only include isPublic if defined
        isPublic: resource.isPublic !== undefined
          ? resource.isPublic
          : undefined,
        // Only include isLiked if defined, null otherwise
        isLiked: resource.isLiked !== undefined
          ? resource.isLiked
          : null,
      }),
    }
  );

  // Throw if the update failed
  if (!response.ok) {
    throw new Error("Failed to update resource");
  }
};

export default updateResource;
