"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import CommunityFilters from "@/components/Community/CommunityFilters";
import CommunityCard from "@/components/Community/CommunityCard";
import Loading from "@/components/Loading";
import { ServerUrl } from "@/lib/urls";

// Mock resources for testing
const mockResources = [
  {
    id: "1",
    title: "React Basics",
    author: "Alice",
    createdAt: "2025-05-01T10:00:00Z",
    shareCount: 12,
    likes: 34,
    school: "BCIT",
    course: "CPSC 319",
  },
  {
    id: "2",
    title: "Node.js Guide",
    author: "Bob",
    createdAt: "2025-04-20T14:30:00Z",
    shareCount: 5,
    likes: 8,
    school: "UBC",
    course: "CPSC 210",
  },
  {
    id: "3",
    title: "CSS Grid Mastery",
    author: "Carol",
    createdAt: "2025-03-15T09:45:00Z",
    shareCount: 8,
    likes: 15,
    school: "SFU",
    course: "WEB 200",
  },
];

export default function CommunityPage() {
  // MOCK TESTING
  const [resources, setResources] = useState(mockResources);
  const allSchools = Array.from(new Set(mockResources.map(r => r.school)));
  const allCourses = Array.from(new Set(mockResources.map(r => r.course)));
  // const [resources, setResources] = useState(null);
  // const [allSchools, setAllSchools] = useState([]);
  // const [allCourses, setAllCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Text for the title search input
  const [selectedSchool, setSelectedSchool] = useState(""); // Value for school dropdown
  const [selectedCourse, setSelectedCourse] = useState(""); // Value for course dropdown
  const [sortOption, setSortOption] = useState("newest"); // Value for active sort
  const [filterFunction, setFilterFunction] = useState(() => () => true); // Default allow all
  const [sortFunction, setSortFunction] = useState(() => () => 0); // Determines sort order (default original order)

  const router = useRouter();

  // Fetch backend data on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // URL to public resources endpoint (Obtain all public resources)
        const res = await fetch(`\${ServerUrl}/resources/public`, { credentials: "include" });
        if ([401, 201].includes(res.status)) return router.push(`${ServerUrl}/auth/google`);
        if (!res.ok) throw new Error("Failed to fetch resources");
        const data = await res.json();
        setResources(data.resources); // Update state with real data
        // Extract all avaliable school names
        setAllSchools(
          Array.from(new Set(data.resources.map((r) => r.school).filter(Boolean)))
        );
        // Extract all avaliable courses
        setAllCourses(
          Array.from(new Set(data.resources.map((r) => r.course).filter(Boolean)))
        );
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, [router]); // Only re-run if router changes

  // Recompute filter flag state
  useEffect(() => {
    // Tests each resource to see if it matches the filter
    const newFilter = (r) => {
      const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSchool = !selectedSchool || r.school === selectedSchool;
      const matchesCourse = !selectedCourse || r.course === selectedCourse;
      return matchesSearch && matchesSchool && matchesCourse; //
    };
    setFilterFunction(() => newFilter);
  }, [searchQuery, selectedSchool, selectedCourse]); // Re-run if filter changes

  useEffect(() => {
    // Sort depending on selected option
    const newSort = (a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "likes":
          // Descending by likes
          return b.likes - a.likes;
        case "shareCount":
          // Descending by shareCount
          return b.shareCount - a.shareCount;
        default:
          return 0;
      }
    };
    setSortFunction(() => newSort);
  }, [sortOption]);

  // Apply the filters and sort to each resource (obtain the filtered array of resources)
  // useMemo caches the result and only recomputes when inputs actually change
  const filteredResources = useMemo(
    () => (resources ? [...resources].filter(filterFunction).sort(sortFunction) : []),
    [resources, filterFunction, sortFunction]
  );

  return resources ? (
    <div className="flex flex-col w-full justify-center items-center p-6">
      <div className="container">
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-2xl font-bold">Community Resources</h1>
        </div>
        <CommunityFilters
          allSchools={allSchools}
          allCourses={allCourses}
          selectedSchool={selectedSchool}
          selectedCourse={selectedCourse}
          searchQuery={searchQuery}
          sortOption={sortOption}
          onFilterChange={(q, school, course) => {
            setSearchQuery(q);
            setSelectedSchool(school);
            setSelectedCourse(course);
          }}
          onSortChange={setSortOption}
        />
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No resources found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredResources.map((resource) => (
              <CommunityCard
                key={resource.id}
                _id={resource}
                title={resource.title}
                author={resource.author}
                createdAt={resource.createdAt}
                shareCount={resource.shareCount}
                likes={resource.likes}
                school={resource.school}
                course={resource.course}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
