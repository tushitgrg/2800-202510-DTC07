import { ServerUrl } from "@/lib/urls";

const updateResource = async (resource) => {
  const response = await fetch(`${ServerUrl}/resources/${resource.editingId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newTitle: resource.editValue
        ? resource.editValue
        : resource.newTitle || null,
      newTags: resource.updatedResource ? resource.updatedResource.tags : [],
      newSchool: resource.newSchool ?? null,
      newCourse: resource.newCourse ?? null,
      isPublic: resource.isPublic !== undefined ? resource.isPublic : undefined,
      isLiked: resource.isLiked !== undefined ? resource.isLiked : null,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update resource");
  }
};

export default updateResource;
