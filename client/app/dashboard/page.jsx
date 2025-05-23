"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ServerUrl } from "@/lib/urls";
import Loading from "@/components/Loading";
import ResourceCard from "@/components/dashboard/ResourceCard";
import MiniProfileCard from "@/components/ProfileCard/MiniProfileCard";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import updateResource from "@/lib/updateResource";
import toast from "react-hot-toast";

/**
 * Dashboard page component that displays user's learning resources
 * Provides filtering, sorting, editing, and tagging functionalities
 * @returns {JSX.Element} The dashboard UI with resource cards
 */
export default function DashboardPage() {
  // State for resource data and UI operations
  const [resources, setResources] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [sharingResourceId, setSharingResourceId] = useState(null);

  // State for filtering and sorting
  const [filterFunction, setFilterFunction] = useState(() => () => true);
  const [sortFunction, setSortFunction] = useState(() => () => 0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const router = useRouter();

  /**
   * Fetches user's resources and extracts unique tags
   */
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${ServerUrl}/resources/info`, {
          credentials: "include",
        });
        if (response.status == 401 || response.status == 201) {
          return router.push(`${ServerUrl}/auth/google`);
        }
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data.resources);

        // Extract unique tags from resources
        const uniqueTags = Array.from(
          new Set(
            data.resources
              .flatMap((resource) => resource.tags || [])
              .filter((tag) => tag),
          ),
        );
        setAllTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, [router]);

  /**
   * Updates filter function when search query or selected tags change
   */
  useEffect(() => {
    const newFilterFunction = (resource) => {
      const matchesSearch = (resource.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => resource.tags?.includes(tag));
      return matchesSearch && matchesTags;
    };

    setFilterFunction(() => newFilterFunction);
  }, [searchQuery, selectedTags]);

  /**
   * Updates sort function when sort option changes
   */
  useEffect(() => {
    const newSortFunction = (a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    };

    setSortFunction(() => newSortFunction);
  }, [sortOption]);

  // Get filtered and sorted resources
  const filteredResources = useMemo(() => {
    if (!resources) return [];
    return [...resources].filter(filterFunction).sort(sortFunction);
  }, [resources, filterFunction, sortFunction]);

  /**
   * Navigates to the create page
   */
  const handleCreateClick = () => {
    router.push("/create");
  };

  /**
   * Starts editing a resource title
   * @param {string} id - Resource ID
   * @param {string} title - Current resource title
   */
  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditValue(title);
  };

  /**
   * Saves edits to resource title
   * Updates both local state and backend database
   */
  const handleSaveEdit = async () => {
    if (editValue.trim() === "") return;

    try {
      const updatedResource = resources.find((r) => r.id === editingId);
      if (!updatedResource) return;

      // Update db
      updateResource({
        editingId: editingId,
        editValue: editValue,
        updatedResource: updatedResource,
      });

      setResources(
        resources.map((resource) =>
          resource.id === editingId
            ? { ...resource, title: editValue }
            : resource,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating resource:", error);
      // Update UI even if server update fails
      setResources(
        resources.map((resource) =>
          resource.id === editingId
            ? { ...resource, title: editValue }
            : resource,
        ),
      );
      setEditingId(null);
    }
  };

  /**
   * Cancels the current edit operation
   */
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  /**
   * Deletes a resource after confirmation
   * @param {string} id - Resource ID to delete
   */
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      try {
        const response = await fetch(`${ServerUrl}/resources/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to delete resource");
        }

        // Update the local state
        setResources(resources.filter((resource) => resource.id !== id));

        // Update allTags after resource removal
        updateAllTagsAfterResourceChange();
      } catch (error) {
        console.error("Error deleting resource:", error);
        // Update UI even if server delete fails
        setResources(resources.filter((resource) => resource.id !== id));
        updateAllTagsAfterResourceChange();
      }
    }
  };

  /**
   * Shares a resource by updating its properties in the database
   * @param {string} id - Resource ID
   * @param {string} newTitle - Updated title
   * @param {string|null} schoolData - School association
   * @param {string|null} courseData - Course association
   * @param {boolean} isPublicData - Public visibility flag
   */
  const handleShare = async (
    id,
    newTitle,
    schoolData,
    courseData,
    isPublicData,
  ) => {
    try {
      // Update the resource in the database
      updateResource({
        editingId: id,
        editValue: newTitle,
        newSchool: schoolData,
        newCourse: courseData,
        isPublic: isPublicData,
      });

      setSharingResourceId(null);
      // Update local state
      setResources(
        resources.map((resource) =>
          resource.id === id
            ? {
                ...resource,
                title: newTitle,
                school: schoolData,
                course: courseData,
                isPublic: isPublicData,
              }
            : resource,
        ),
      );
      toast.success("Your resource is now public!", {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error sharing resource:", error);
      toast.error("There was some error!", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  /**
   * Opens the share dialog for a resource
   * @param {string} id - Resource ID
   */
  const handleOpenShareDialog = (id) => {
    setSharingResourceId(id);
  };

  /**
   * Closes the share dialog
   */
  const handleCloseShareDialog = () => {
    setSharingResourceId(null);
  };

  /**
   * Adds a tag to a resource
   * @param {string} resourceId - Resource ID
   * @param {string} tag - Tag to add
   */
  const handleAddTag = (resourceId, tag) => {
    // Find the resource
    const resource = resources.find((r) => r.id === resourceId);
    if (!resource) return;

    // Make sure we don't add duplicate tags or exceed 5 tags
    const currentTags = resource.tags || [];
    if (currentTags.includes(tag) || currentTags.length >= 5) return;

    // Update resources with new tag
    const updatedResources = resources.map((r) => {
      if (r.id === resourceId) {
        return {
          ...r,
          tags: [...currentTags, tag],
        };
      }
      return r;
    });

    setResources(updatedResources);

    // Add to all tags if new
    if (!allTags.includes(tag)) {
      setAllTags([...allTags, tag]);
    }
  };

  /**
   * Removes a tag from a resource
   * @param {string} resourceId - Resource ID
   * @param {string} tagToRemove - Tag to remove
   */
  const handleRemoveTag = (resourceId, tagToRemove) => {
    // Update resources by removing tag
    const updatedResources = resources.map((r) => {
      if (r.id === resourceId) {
        return {
          ...r,
          tags: (r.tags || []).filter((tag) => tag !== tagToRemove),
        };
      }
      return r;
    });

    setResources(updatedResources);

    // Update allTags if this was the last resource with this tag
    updateAllTagsAfterResourceChange(updatedResources);
  };

  /**
   * Updates the allTags array based on current resources
   * @param {Array} currentResources - Resources to extract tags from
   */
  const updateAllTagsAfterResourceChange = (currentResources = resources) => {
    const uniqueTags = Array.from(
      new Set(
        currentResources
          .flatMap((resource) => resource.tags || [])
          .filter((tag) => tag),
      ),
    );
    setAllTags(uniqueTags);
  };

  /**
   * Formats a date string to a user-friendly format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  /**
   * Updates search query and selected tags filters
   * Memoized to avoid unnecessary re-renders
   */
  const handleFilterChange = useCallback((newSearchQuery, newSelectedTags) => {
    setSearchQuery(newSearchQuery);
    setSelectedTags(newSelectedTags);
  }, []);

  /**
   * Updates sort option for resources
   * Memoized to avoid unnecessary re-renders
   */
  const handleSortChange = useCallback((newSortOption) => {
    setSortOption(newSortOption);
  }, []);

  /**
   * Adds a tag to the selected tags when clicked in a resource card
   * @param {string} tag - Tag to add to filter
   */
  const handleTagClick = (tag) => {
    // Only add the tag if it's not already in the selected tags
    if (!selectedTags.includes(tag)) {
      const newSelectedTags = [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
    }
  };

  return (
    <>
      {resources != null ? (
        <div className="flex flex-col w-full justify-center items-center p-10">
          <div className="container">
            {/* Mini Profile Card */}
            <MiniProfileCard resources={resources} />

            {/* Dashboard Filters */}
            <DashboardFilters
              resources={resources}
              allTags={allTags}
              selectedTags={selectedTags}
              searchQuery={searchQuery}
              sortOption={sortOption}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />

            <div className="flex justify-between w-full items-center mb-6">
              <h1 className="text-2xl font-bold">Your Resources</h1>
              <Button onClick={handleCreateClick} style={{ cursor: "pointer" }}>
                <Plus className="mr-2 h-4 w-4" />
                Create
              </Button>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No resources found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    progress={resource.progress}
                    editingId={editingId}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    handleEdit={handleEdit}
                    handleSaveEdit={handleSaveEdit}
                    handleCancelEdit={handleCancelEdit}
                    handleDelete={handleDelete}
                    handleShare={handleShare}
                    handleAddTag={handleAddTag}
                    handleRemoveTag={handleRemoveTag}
                    allTags={allTags}
                    formatDate={formatDate}
                    isSharing={sharingResourceId === resource.id}
                    onOpenShareDialog={() => handleOpenShareDialog(resource.id)}
                    onCloseShareDialog={handleCloseShareDialog}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
