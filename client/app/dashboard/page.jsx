"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreHorizontal, Plus, Edit, Trash, Share, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const router = useRouter();

  // Load data when component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`http://localhost:3001/resources/info`, {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        console.log('Resources data:', data);
        setResources(data.resources);
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
      const response = await fetch(`http://localhost:3001/resources/${editingId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newTitle: editValue,
          newTags: [] // tag functionality later
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
        const response = await fetch(`http://localhost:3001/resources/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to delete resource');
        }

        // Update the local state
        setResources(resources.filter(resource => resource.id !== id));
      } catch (error) {
        console.error('Error deleting resource:', error);
        // Still update UI for better UX
        setResources(resources.filter(resource => resource.id !== id));
      }
    }
  };

  const handleShare = (id) => {
    // Share functionality
    console.log("Share resource", id);
    // Implement share functionality (copy link, open share modal, etc.)
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
    <div className="block p-4 h-full">
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

      {/* Simple progress bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 ">
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
  );

  return (
    <div className="flex flex-col w-full justify-center items-center p-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {resources && resources.map(resource => (
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
    </div>
  );
}