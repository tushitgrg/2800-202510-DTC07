"use client";

import { MoreHorizontal, Edit, Trash, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Component that provides a dropdown menu of actions for a resource
 * Includes options to edit, delete, and share a resource
 *
 * @param {Object} props - Component props
 * @param {Object} props.resource - The resource to perform actions on
 * @param {Function} props.handleEdit - Function to handle editing the resource
 * @param {Function} props.handleDelete - Function to handle deleting the resource
 * @param {Function} props.onOpenShareDialog - Function to handle opening the share dialog
 * @returns {JSX.Element} Dropdown menu of resource actions
 */
export default function ResourceActions({
  resource,
  handleEdit,
  handleDelete,
  onOpenShareDialog,
}) {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        {/* Dropdown trigger button */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            style={{ cursor: "pointer" }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu content */}
        <DropdownMenuContent align="end">
          {/* Edit option */}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(resource.id, resource.title);
            }}
            style={{ cursor: "pointer" }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          {/* Delete option */}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(resource.id);
            }}
            style={{ cursor: "pointer" }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

          {/* Share option */}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onOpenShareDialog();
            }}
            style={{ cursor: "pointer" }}
          >
            <Share className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
