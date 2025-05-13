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
  handleRemoveTag
}) {
  const [tagInputValue, setTagInputValue] = useState('');
  const [openTagPopover, setOpenTagPopover] = useState(false);

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {(resource.tags || []).map((tag, idx) => (
        <Badge
          key={`${resource.id}-tag-${idx}`}
          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          variant="secondary"
        >
          {tag}
          {isEditing && (
            <button
              type="button"
              className=""
              onClick={(e) => {
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
                      setTagInputValue('');
                      setOpenTagPopover(false);
                    }
                  }}
                />
              </div>

              {tagInputValue.trim() && !allTags.includes(tagInputValue.trim()) ? (
                <div
                  className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center"
                  onClick={() => {
                    handleAddTag(resource.id, tagInputValue.trim());
                    setTagInputValue('');
                    setOpenTagPopover(false);
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
                          className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center"
                          onClick={() => {
                            handleAddTag(resource.id, tag);
                            setTagInputValue('');
                            setOpenTagPopover(false);
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