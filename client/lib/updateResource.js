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
      newSchool: resource.updatedResource ? resource.school : null,
      newCourse: resource.updatedResource ? resource.course : null,
      isPublic: resource.isPublic ? resource.isPublic : false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update resource");
  }
};


export default updateResource;