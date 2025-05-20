"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResourceActions from "./ResourceActions";
import TagsManager from "./TagsManager";
import ResourceFooter from "./ResourceFooter";
import ShareDialog from "./ShareDialog";

/**
 * Card component representing a resource
 * Supports editing, sharing, tag management, and navigation to the resource page
 *
 * @param {Object} props - Component props
 * @param {Object} props.resource - Resource data object
 * @param {string|null} props.editingId - ID of resource currently being edited, or null
 * @param {string} props.editValue - Current value in the title edit field
 * @param {Function} props.setEditValue - Function to update the edit value
 * @param {Function} props.handleEdit - Function to initiate editing for a resource
 * @param {Function} props.handleSaveEdit - Function to save edits
 * @param {Function} props.handleCancelEdit - Function to cancel editing
 * @param {Function} props.handleDelete - Function to delete the resource
 * @param {Function} props.handleShare - Function to share the resource
 * @param {Function} props.handleAddTag - Function to add a tag to the resource
 * @param {Function} props.handleRemoveTag - Function to remove a tag from the resource
 * @param {Array} props.allTags - All available tags in the system
 * @param {Function} props.formatDate - Function to format date strings
 * @param {boolean} props.isSharing - Whether the sharing dialog is open
 * @param {Function} props.onOpenShareDialog - Function to open share dialog
 * @param {Function} props.onCloseShareDialog - Function to close share dialog
 * @param {Function} props.onTagClick - Function to handle clicking on a tag
 * @returns {JSX.Element} The resource card UI
 */
export default function ResourceCard({
  resource,
  editingId,
  editValue,
  setEditValue,
  handleEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleDelete,
  handleShare,
  handleAddTag,
  handleRemoveTag,
  allTags,
  formatDate,
  isSharing = false,
  onOpenShareDialog,
  onCloseShareDialog,
  onTagClick,
}) {
  // Determine if this card is in editing mode
  const isEditing = editingId === resource.id;
  // Card is interactive (prevent navigation) when editing or sharing
  const isInteractive = isEditing || isSharing;

  /**
   * Prevent navigation when card is in interactive mode
   * @param {Object} e - Click event
   */
  const handleCardClick = (e) => {
    if (isInteractive) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  /**
   * Inner content of the card - extracted to avoid duplication
   * @returns {JSX.Element} Card content
   */
  const CardContent = () => (
    <div className="flex flex-col justify-between p-4 h-full">
      <div>
        <div className="flex justify-between items-center">
          {isEditing ? (
            // Show edit controls when editing
            <div className="flex flex-grow items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="h-9"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit();
                  } else if (e.key === "Escape") {
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
            // Show title when not editing
            <h2 className="text-lg font-semibold">{resource.title}</h2>
          )}

          {/* Actions menu (edit, delete, share) */}
          <ResourceActions
            resource={resource}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            onOpenShareDialog={onOpenShareDialog}
          />
        </div>

        {/* Tags management */}
        <TagsManager
          resource={resource}
          isEditing={isEditing}
          allTags={allTags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          onTagClick={onTagClick}
        />
      </div>

      {/* Footer with date and progress indicators */}
      <ResourceFooter
        resource={resource}
        formatDate={formatDate}
        progress={resource.progress}
      />
    </div>
  );

  return (
    <div className="border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
      {isInteractive ? (
        // When in an interactive state (editing or sharing), don't wrap with Link
        <>
          <CardContent />
          {/* Render ShareDialog when in sharing state */}
          {isSharing && (
            <ShareDialog
              isOpen={isSharing}
              onClose={onCloseShareDialog}
              resource={resource}
              handleShare={handleShare}
            />
          )}
        </>
      ) : (
        // When not in interactive state, wrap with Link for navigation
        <Link href={`/resource/${resource.id}`} onClick={handleCardClick}>
          <CardContent />
        </Link>
      )}
    </div>
  );
}
