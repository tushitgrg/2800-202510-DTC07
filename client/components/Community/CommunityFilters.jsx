"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
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

/**
 * Component for filtering and sorting community resources
 * Provides search input, dynamic school/course dropdown filters, and sorting controls
 *
 * @param {Object} props - Component props
 * @param {string[]} props.allSchools - List of all available schools
 * @param {string[]} props.allCourses - List of all available courses
 * @param {string} props.selectedSchool - Currently selected school filter
 * @param {string} props.selectedCourse - Currently selected course filter
 * @param {string} props.searchQuery - Current search query input
 * @param {string} props.sortOption - Current sorting option key
 * @param {(search: string, school: string, course: string) => void} props.onFilterChange - Callback to update filters
 * @param {(sortOption: string) => void} props.onSortChange - Callback to update sorting
 * @returns {JSX.Element} CommunityFilters UI component
 */
const CommunityFilters = ({
  allSchools, // List of all school options
  allCourses, // List of all course options
  selectedSchool, // Currently selected school filter
  selectedCourse, // Currently selected course filter
  searchQuery, // Current search input
  sortOption, // Current sort selection
  onFilterChange, // Function to update filters
  onSortChange, // Function to update sort
}) => {
  // Local input state for filtering dropdown options dynamically
  const [schoolSearch, setSchoolSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  /** Memoized list of schools matching the schoolSearch input */
  const filteredSchools = useMemo(() => {
    if (!schoolSearch.trim()) return allSchools;
    return allSchools.filter((school) =>
      school.toLowerCase().includes(schoolSearch.toLowerCase())
    );
  }, [schoolSearch, allSchools]);

  /** Memoized list of courses matching the courseSearch input */
  const filteredCourses = useMemo(() => {
    if (!courseSearch.trim()) return allCourses;
    return allCourses.filter((course) =>
      course.toLowerCase().includes(courseSearch.toLowerCase())
    );
  }, [courseSearch, allCourses]);

  /** Apply filters whenever searchQuery, selectedSchool, or selectedCourse changes */
  useEffect(() => {
    onFilterChange(searchQuery, selectedSchool, selectedCourse);
  }, [searchQuery, selectedSchool, selectedCourse, onFilterChange]);

  /** Update school filter */
  const handleSchoolSelect = (school) => {
    onFilterChange(searchQuery, school, selectedCourse);
  };

  /** Update course filter */
  const handleCourseSelect = (course) => {
    onFilterChange(searchQuery, selectedSchool, course);
  };

  /** Update search query filter */
  const handleSearchChange = (e) => {
    onFilterChange(e.target.value, selectedSchool, selectedCourse);
  };

  /** Clear all filters and reset sort to default */
  const handleClearFilters = () => {
    onFilterChange("", "", "");
    onSortChange("createdAt:desc");
  };

  return (
    <div className="w-full my-6 space-y-4">
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
              {/* Determine label based on sortOption */}
              {(() => {
                switch (sortOption) {
                  case "createdAt:desc":
                    return "Newest";
                  case "createdAt:asc":
                    return "Oldest";
                  case "likes:desc":
                    return "Likes";
                  case "shareCount:desc":
                    return "Share Count";
                  default:
                    return "Newest";
                }
              })()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSortChange("createdAt:desc")}>Newest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("createdAt:asc")}>Oldest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("likes:desc")}>Likes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("shareCount:desc")}>Share Count</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Searchable School Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 cursor-pointer">
              School: {selectedSchool || "All"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {/* Input for school search */}
            <div className="px-2 pt-2">
              <input
                type="text"
                placeholder="Search school..."
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                className="w-full px-2 py-1 mb-2 rounded-md border border-gray-600 bg-zinc-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <DropdownMenuSeparator />
            {/* List of filtered schools */}
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <DropdownMenuItem
                  key={school}
                  onClick={() => { handleSchoolSelect(school); setSchoolSearch(""); }}
                  disabled={selectedSchool === school}
                  className="cursor-pointer hover:bg-zinc-700"
                >
                  {school}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled className="text-gray-400">
                No results
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => { handleSchoolSelect(""); setSchoolSearch(""); }}
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
          <DropdownMenuContent align="start" className="w-64">
            {/* Input for course search */}
            <div className="px-2 pt-2">
              <input
                type="text"
                placeholder="Search course..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full px-2 py-1 mb-2 rounded-md border border-gray-600 bg-zinc-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <DropdownMenuSeparator />
            {/* List of filtered courses */}
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <DropdownMenuItem
                  key={course}
                  onClick={() => { handleCourseSelect(course); setCourseSearch(""); }}
                  disabled={selectedCourse === course}
                  className="cursor-pointer hover:bg-zinc-700"
                >
                  {course}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled className="text-gray-400">
                No results
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => { handleCourseSelect(""); setCourseSearch(""); }}
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
                onClick={() => handleSchoolSelect("")} // Remove school filter badge
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
                onClick={() => handleCourseSelect("")} // Remove course filter badge
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
              onClick={handleClearFilters} // Clear all filters
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

export default CommunityFilters;
