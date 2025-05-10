"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreHorizontal, Plus, Edit, Trash, Share, Check, X, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServerUrl } from "@/lib/urls";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  const [resources, setResources] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [openTagPopover, setOpenTagPopover] = useState(false);
  const router = useRouter();

  // Single useEffect for fetching data when component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${ServerUrl}/resources/info`, {
          credentials: 'include'
        });
        if(response.status === 401){
          return router.push(`${ServerUrl}/auth/google`)
        }
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        console.log('Resources data:', data);
        setResources(data.resources);

        // Extract unique tags from resources
        const uniqueTags = Array.from(
          new Set(
            data.resources
              .flatMap(resource => resource.tags || [])
              .filter(tag => tag)
          )
        );
        setAllTags(uniqueTags);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  const handleCreateClick = () => {
    router.push("/create");
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditValue(title);
  };

  const handleSaveEdit = async () => {
    if (editValue.trim() === "") return;

    try {
      const updatedResource = resources.find(r => r.id === editingId);
      if (!updatedResource) return;

      const response = await fetch(`${ServerUrl}/resources/${editingId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newTitle: editValue,
          newTags: updatedResource.tags || []
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resource');
      }

      setResources(resources.map(resource =>
        resource.id === editingId ? { ...resource, title: editValue } : resource
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating resource:', error);
      // Still update UI for better UX
      setResources(resources.map(resource =>
        resource.id === editingId ? { ...resource, title: editValue } : resource
      ));
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      try {
        const response = await fetch(`${ServerUrl}/resources/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete resource');
        }

        // Update the local state
        setResources(resources.filter(resource => resource.id !== id));

        // Update allTags after resource removal
        updateAllTagsAfterResourceChange();
      } catch (error) {
        console.error('Error deleting resource:', error);
        // Still update UI for better UX
        setResources(resources.filter(resource => resource.id !== id));
        updateAllTagsAfterResourceChange();
      }
    }
  };

  const handleShare = (id) => {
    // Share functionality
    console.log("Share resource", id);
    // Implement share functionality (copy link, open share modal, etc.)
  };

  const handleAddTag = (resourceId, tag) => {
    // Find the resource
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;

    // Make sure we don't add duplicate tags or exceed 3 tags
    const currentTags = resource.tags || [];
    if (currentTags.includes(tag) || currentTags.length >= 3) return;

    // Update resources with new tag
    const updatedResources = resources.map(r => {
      if (r.id === resourceId) {
        return {
          ...r,
          tags: [...currentTags, tag]
        };
      }
      return r;
    });

    setResources(updatedResources);

    // Add to all tags if new
    if (!allTags.includes(tag)) {
      setAllTags([...allTags, tag]);
    }

    setTagInputValue('');
    setOpenTagPopover(false);
  };

  const handleRemoveTag = (resourceId, tagToRemove) => {
    // Update resources by removing tag
    const updatedResources = resources.map(r => {
      if (r.id === resourceId) {
        return {
          ...r,
          tags: (r.tags || []).filter(tag => tag !== tagToRemove)
        };
      }
      return r;
    });

    setResources(updatedResources);

    // Update allTags if this was the last resource with this tag
    updateAllTagsAfterResourceChange(updatedResources);
  };

  // Helper function to update allTags based on current resources
  const updateAllTagsAfterResourceChange = (currentResources = resources) => {
    const uniqueTags = Array.from(
      new Set(
        currentResources
          .flatMap(resource => resource.tags || [])
          .filter(tag => tag)
      )
    );
    setAllTags(uniqueTags);
  };

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Card content component to avoid duplicating code
  const CardContent = ({ resource }) => (
    <div className="flex flex-col justify-between p-4 h-full">
      <div>
        <div className="flex justify-between items-center">
          {editingId === resource.id ? (
            <div className="flex flex-grow items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="h-9"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveEdit();
                  } else if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveEdit();
                }}
                className="h-8 w-8 p-0"
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelEdit();
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <h2 className="text-lg font-semibold">{resource.title}</h2>
          )}

          <div className="relative" onClick={e => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" style={{ cursor: 'pointer' }}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(resource.id, resource.title);
                }} style={{ cursor: 'pointer' }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(resource.id);
                }} style={{ cursor: 'pointer' }}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleShare(resource.id);
                }} style={{ cursor: 'pointer' }}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tag Management */}
        <div className="mt-2 flex flex-wrap gap-2">
          {(resource.tags || []).map((tag, idx) => (
            <Badge
              key={`${resource.id}-tag-${idx}`}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              variant="secondary"
            >
              {tag}
              {editingId === resource.id && (
                <button
                  type="button"
                  className=""
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(resource.id, tag);
                  }}
                >
                  <X
                    className="ml-1 h-3 w-3 text-red-500 cursor-pointer"
                  />
                </button>
              )}
            </Badge>
          ))}

          {/* Add Tag Button - Only visible in edit mode */}
          {editingId === resource.id && (resource.tags || []).length < 3 && (
            <Popover open={openTagPopover} onOpenChange={setOpenTagPopover}>
              <PopoverTrigger asChild onClick={e => e.stopPropagation()}>
                <Badge variant="outline" className="cursor-pointer border-dashed">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Tag
                </Badge>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-0" onClick={e => e.stopPropagation()}>
                <div className="p-2">
                  <div className="flex items-center border rounded px-2 py-1 mb-2">
                    <TagIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <input
                      className="w-full focus:outline-none bg-transparent"
                      placeholder="Search or create tag..."
                      value={tagInputValue}
                      onChange={(e) => setTagInputValue(e.currentTarget.value)}
                      onSelect={(e) => {
                        const input = e.target;
                        input.selectionStart = input.selectionEnd; // cancel selection
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && tagInputValue.trim()) {
                          e.preventDefault();
                          handleAddTag(resource.id, tagInputValue.trim());
                        }
                      }}
                    />
                  </div>

                  {tagInputValue.trim() && !allTags.includes(tagInputValue.trim()) ? (
                    <div
                      className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center"
                      onClick={() => handleAddTag(resource.id, tagInputValue.trim())}
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      Create tag "{tagInputValue.trim()}"
                    </div>
                  ) : null}

                  <div className="mt-2">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Existing Tags</div>
                    {allTags.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No existing tags</div>
                    ) : (
                      <div className="max-h-32 overflow-y-auto">
                        {allTags
                          .filter(tag => tag.toLowerCase().includes(tagInputValue.toLowerCase()))
                          .map((tag) => (
                            <div
                              key={tag}
                              className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center"
                              onClick={() => handleAddTag(resource.id, tag)}
                            >
                              <TagIcon className="mr-2 h-4 w-4" />
                              {tag}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Simple progress bar */}
      <div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
        <div className="flex w-full pt-2">
          <span className="text-sm w-full text-right text-gray-500">
            {formatDate(resource.createdAt || resource.date)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
    {resources!=null ?<div className="flex flex-col w-full justify-center items-center p-6">
      {/* Header */}
      <div className="container">
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={handleCreateClick} style={{ cursor: 'pointer' }}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </div>

        {/* Resource cards */}
        {resources.length===0 && <p>You dont have any study material created! Create one now!</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {resources.map(resource => (
            <div
              key={resource.id}
              className="border rounded-lg hover:shadow-md transition-shadow overflow-hidden"
            >
              {editingId === resource.id ? (
                // When editing, don't wrap with Link
                <CardContent resource={resource} />
              ) : (
                // When not editing, wrap with Link
                <Link href={`/resource/${resource.id}`}>
                  <CardContent resource={resource} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>: <Loading/>}
    </>
   
  );
}