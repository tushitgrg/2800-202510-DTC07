"use client";

import { MoreHorizontal, Edit, Trash, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ResourceActions({
  resource,
  handleEdit,
  handleDelete,
  handleShare
}) {
  return (
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
  );
}