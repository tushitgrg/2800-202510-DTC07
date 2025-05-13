"use client";

import { useState } from "react";
import { Plus, X, Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TagsManager({
  resource,
  isEditing,
  allTags,
  handleAddTag,
  handleRemoveTag,
  onTagClick
}) {
  const [tagInputValue, setTagInputValue] = useState('');
  const [openTagPopover, setOpenTagPopover] = useState(false);

  // Function to handle adding a tag with proper event handling
  const addTagAndClose = (tag) => {
    if (tag && tag.trim()) {
      handleAddTag(resource.id, tag.trim());
      setTagInputValue('');
      setOpenTagPopover(false);
    }
  };

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {(resource.tags || []).map((tag, idx) => (
        <Badge
          key={`${resource.id}-tag-${idx}`}
          className={`
            bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300
            ${!isEditing ? "cursor-pointer hover:shadow-md hover:scale-105 hover:text-white hover:dark:text-white transform transition-all duration-200 " : ""}
          `}
          variant="secondary"
          onClick={isEditing ? undefined : (e) => {
            e.preventDefault(); // Prevent navigation to resource page
            e.stopPropagation(); // Stop event bubbling
            onTagClick && onTagClick(tag);
          }}
        >
          {tag}
          {isEditing && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveTag(resource.id, tag);
              }}
            >
              <X className="ml-1 h-3 w-3 text-red-500 cursor-pointer" />
            </button>
          )}
        </Badge>
      ))}

      {/* Add Tag Button - Only visible in edit mode */}
      {isEditing && (resource.tags || []).length < 3 && (
        <Popover
          open={openTagPopover}
          onOpenChange={(open) => {
            if (open) {
              setOpenTagPopover(open);
            } else {
              // Short delay to allow other click handlers to execute
              setTimeout(() => setOpenTagPopover(open), 100);
            }
          }}
        >
          <PopoverTrigger asChild>
            <Badge
              variant="outline"
              className="cursor-pointer border-dashed hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenTagPopover(true);
              }}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Tag
            </Badge>
          </PopoverTrigger>
          <PopoverContent
            className="w-60 p-0"
            onClick={(e) => {
              // Prevent clicks inside popover from closing it
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="p-2">
              <div className="flex items-center border rounded px-2 py-1 mb-2">
                <TagIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <input
                  className="w-full focus:outline-none bg-transparent"
                  placeholder="Search or create tag..."
                  value={tagInputValue}
                  onChange={(e) => setTagInputValue(e.target.value)}
                  onClick={(e) => {
                    // Prevent clicking in input from closing popover
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tagInputValue.trim()) {
                      e.preventDefault();
                      addTagAndClose(tagInputValue);
                    }
                  }}
                />
              </div>

              {tagInputValue.trim() && !allTags.includes(tagInputValue.trim()) ? (
                <div
                  className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center transition-colors duration-150"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addTagAndClose(tagInputValue);
                  }}
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
                          className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center transition-all duration-200 hover:pl-3"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addTagAndClose(tag);
                          }}
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
  );
}