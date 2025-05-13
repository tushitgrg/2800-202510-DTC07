"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResourceActions from "./ResourceActions";
import TagsManager from "./TagsManager";
import ResourceFooter from "./ResourceFooter";

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
  formatDate
}) {
  const isEditing = editingId === resource.id;


  return (
    <div className="border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
      {isEditing ? (
        // When editing, don't wrap with Link
        <div className="flex flex-col justify-between p-4 h-full">
          <div>
            <div className="flex justify-between items-center">
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
              <ResourceActions
                resource={resource}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleShare={handleShare}
              />
            </div>
            <TagsManager
              resource={resource}
              isEditing={isEditing}
              allTags={allTags}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
            />
          </div>
          <ResourceFooter
            resource={resource}
            formatDate={formatDate}
          />
        </div>
      ) : (
        // When not editing, wrap with Link
        <Link href={`/resource/${resource.id}`}>
          <div className="flex flex-col justify-between p-4 h-full">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{resource.title}</h2>
                <ResourceActions
                  resource={resource}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleShare={handleShare}
                />
              </div>
              <TagsManager
                resource={resource}
                isEditing={isEditing}
                allTags={allTags}
                handleAddTag={handleAddTag}
                handleRemoveTag={handleRemoveTag}
              />
            </div>
            <ResourceFooter
              resource={resource}
              formatDate={formatDate}
            />
          </div>
        </Link>
      )}
    </div>
  );
}