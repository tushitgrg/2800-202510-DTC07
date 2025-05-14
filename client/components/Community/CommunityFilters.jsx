import { useEffect } from "react";
import { Search, Filter, SortAsc, SortDesc, X } from "lucide-react";
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

const CommunityFilters = ({
  allSchools,
  allCourses,
  selectedSchool,
  selectedCourse,
  searchQuery,
  sortOption,
  onFilterChange,
  onSortChange
}) => {
  useEffect(() => {
    onFilterChange(searchQuery, selectedSchool, selectedCourse);
  }, [searchQuery, selectedSchool, selectedCourse, onFilterChange]);

  const handleSchoolSelect = (school) => {
    onFilterChange(searchQuery, school, selectedCourse);
  };

  const handleCourseSelect = (course) => {
    onFilterChange(searchQuery, selectedSchool, course);
  };

  const handleSearchChange = (e) => {
    onFilterChange(e.target.value, selectedSchool, selectedCourse);
  };

  const handleClearFilters = () => {
    onFilterChange("", "", "");
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
            onClick={() => onFilterChange("", selectedSchool, selectedCourse)}
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
              ) : sortOption === "likes" ? (
                <SortAsc className="mr-2 h-4 w-4" />
              ) : (
                <SortDesc className="mr-2 h-4 w-4" />
              )}
              {sortOption === "newest"
                ? "Newest"
                : sortOption === "oldest"
                  ? "Oldest"
                  : sortOption === "likes"
                    ? "Likes"
                    : "Share Count"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSortChange("newest")} className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("oldest")} className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("likes")} className="cursor-pointer">
              <SortAsc className="mr-2 h-4 w-4" />
              Likes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("shareCount")} className="cursor-pointer">
              <SortDesc className="mr-2 h-4 w-4" />
              Share Count
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* School filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 cursor-pointer">
              School: {selectedSchool || "All"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by school</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allSchools.map((school) => (
              <DropdownMenuItem
                key={school}
                onClick={() => handleSchoolSelect(school)}
                disabled={selectedSchool === school}
                className="cursor-pointer"
              >
                {school}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleSchoolSelect("")}
              disabled={!selectedSchool}
              className="cursor-pointer"
            >
              All Schools
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Course filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 cursor-pointer">
              Course: {selectedCourse || "All"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by course</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allCourses.map((course) => (
              <DropdownMenuItem
                key={course}
                onClick={() => handleCourseSelect(course)}
                disabled={selectedCourse === course}
                className="cursor-pointer"
              >
                {course}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleCourseSelect("")}
              disabled={!selectedCourse}
              className="cursor-pointer"
            >
              All Courses
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Selected filters badges */}
        <div className="flex flex-wrap gap-1 ml-1 items-center">
          {selectedSchool && (
            <Badge variant="secondary" className="pl-2 pr-1 py-1 h-7">
              {selectedSchool}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSchoolSelect("")}
                className="h-5 w-5 p-0 ml-1 rounded-full hover:text-red-600 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCourse && (
            <Badge variant="secondary" className="pl-2 pr-1 py-1 h-7">
              {selectedCourse}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCourseSelect("")}
                className="h-5 w-5 p-0 ml-1 rounded-full hover:text-red-600 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {(searchQuery || selectedSchool || selectedCourse) && (
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

export default CommunityFilters