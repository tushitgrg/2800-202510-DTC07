import { useEffect } from "react";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  X,
  Tag as TagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const DashboardFilters = ({
  resources,
  allTags,
  selectedTags,
  searchQuery,
  sortOption,
  onFilterChange,
  onSortChange,
}) => {
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(searchQuery, selectedTags);
  }, [searchQuery, selectedTags, onFilterChange]);

  // Handle adding a tag to the filter
  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      const newSelectedTags = [...selectedTags, tag];
      onFilterChange(searchQuery, newSelectedTags);
    }
  };

  // Handle removing a tag from the filter
  const handleRemoveTag = (tag) => {
    const newSelectedTags = selectedTags.filter((t) => t !== tag);
    onFilterChange(searchQuery, newSelectedTags);
  };

  // Handle search query changes
  const handleSearchChange = (e) => {
    onFilterChange(e.target.value, selectedTags);
  };

  // Handle sort option changes
  const handleSortChange = (option) => {
    onSortChange(option);
  };

  // Clear all filters
  const handleClearFilters = () => {
    onFilterChange("", []);
    onSortChange("newest");
  };

  return (
    <div className="w-full mb-6 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 w-full"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => onFilterChange("", selectedTags)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 cursor-pointer">
              {sortOption === "newest" || sortOption === "oldest" ? (
                <Filter className="mr-2 h-4 w-4" />
              ) : sortOption === "a-z" ? (
                <SortAsc className="mr-2 h-4 w-4" />
              ) : (
                <SortDesc className="mr-2 h-4 w-4" />
              )}
              {sortOption === "newest"
                ? "Newest"
                : sortOption === "oldest"
                  ? "Oldest"
                  : sortOption === "a-z"
                    ? "A to Z"
                    : "Z to A"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleSortChange("newest")}
              className="cursor-pointer"
            >
              <Filter className="mr-2 h-4 w-4" />
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortChange("oldest")}
              className="cursor-pointer"
            >
              <Filter className="mr-2 h-4 w-4" />
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortChange("a-z")}
              className="cursor-pointer"
            >
              <SortAsc className="mr-2 h-4 w-4" />A - Z
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortChange("z-a")}
              className="cursor-pointer"
            >
              <SortDesc className="mr-2 h-4 w-4" />Z - A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tag filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 cursor-pointer">
              <TagIcon className="mr-2 h-4 w-4" />
              Tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by tag</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allTags.length > 0 ? (
              allTags.map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  disabled={selectedTags.includes(tag)}
                  className="cursor-pointer"
                >
                  <TagIcon className="mr-2 h-4 w-4" />
                  {tag}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No tags available
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Selected tags */}
        <div className="flex flex-wrap gap-1 ml-1 items-center">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1 h-7">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveTag(tag)}
                className="h-5 w-5 p-0 ml-1 rounded-full hover:text-red-600 hover:dark:text-red-600 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {/* Clear filters button */}
          {(searchQuery || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-9 cursor-pointer text-slate-300"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
