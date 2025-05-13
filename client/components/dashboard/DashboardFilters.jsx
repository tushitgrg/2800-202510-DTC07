import { useState, useEffect } from "react";
import { Search, Filter, SortAsc, SortDesc, X, Tag as TagIcon } from "lucide-react";
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
  onFilterChange,
  onSortChange
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  // Update filters when inputs change
  useEffect(() => {
    const filterFunction = (resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => resource.tags?.includes(tag));
      return matchesSearch && matchesTags;
    };

    // Create a sort function based on current sort option
    const sortFunction = (a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    };

    onFilterChange(filterFunction);
    onSortChange(sortFunction);
  }, [searchQuery, selectedTags, sortOption, onFilterChange, onSortChange]);

  // Add a tag to selected tags
  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Remove a tag from selected tags
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortOption("newest");
  };

  return (
    <div className="w-full mb-6 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => setSearchQuery("")}
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
            <Button variant="outline" size="sm" className="h-9">
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
            <DropdownMenuItem onClick={() => setSortOption("newest")} className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("oldest")} className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("a-z")} className="cursor-pointer">
              <SortAsc className="mr-2 h-4 w-4" />
              A - Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("z-a")} className="cursor-pointer">
              <SortDesc className="mr-2 h-4 w-4" />
              Z - A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tag filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
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
                className="h-5 w-5 p-0 ml-1 -mr-1 rounded-full hover:bg-muted"
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
            className="h-9"
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        )}
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;