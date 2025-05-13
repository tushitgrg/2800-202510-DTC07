"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShareDialog from "./ShareDialog";

export default function ResourceActions({
  resource,
  handleEdit,
  handleDelete,
  handleShare
}) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const openShareDialog = (e) => {
    e.stopPropagation();
    setIsShareDialogOpen(true);
  };

  const closeShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  const processShare = (shareData) => {
    if (shareData.title !== resource.title) {
      handleShare(resource.id, shareData.title, shareData.isPublic);
    } else {
      handleShare(resource.id, null, shareData.isPublic);
    }
  };

  return (
    <>
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
            <DropdownMenuItem onClick={openShareDialog} style={{ cursor: 'pointer' }}>
              <Share className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={closeShareDialog}
        resource={resource}
        onShare={processShare}
      />
    </>
  );
}