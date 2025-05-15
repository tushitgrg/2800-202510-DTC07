"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommunityFilters from "@/components/Community/CommunityFilters";
import CommunityCard from "@/components/Community/CommunityCard";
import Loading from "@/components/Loading";
import { ServerUrl } from "@/lib/urls";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  const [resources, setResources] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Text for the title search input
  const [selectedSchool, setSelectedSchool] = useState(""); // Value for school dropdown
  const [selectedCourse, setSelectedCourse] = useState(""); // Value for course dropdown
  const [sortOption, setSortOption] = useState("createdAt:desc"); // Value for active sort (default Newest)
  const [filteredResources, setFilteredResources] = useState([]);

  const router = useRouter();

  // Obtain the dropdown options from filteredResources
  const availableCourses = useMemo(
    () =>
      Array.from(
        new Set(filteredResources.map((r) => r.course).filter(Boolean))
      ),
    [filteredResources]
  );

  const availableSchools = useMemo(
    () =>
      Array.from(
        new Set(filteredResources.map((r) => r.school).filter(Boolean))
      ),
    [filteredResources]
  );

  // Fetch backend data on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // URL to public resources endpoint (Obtain all public resources)
        const res = await fetch(`${ServerUrl}/resources/public`, { credentials: "include" });
        if ([401, 201].includes(res.status)) return router.push(`${ServerUrl}/auth/google`);
        if (!res.ok) throw new Error("Failed to fetch resources");
        const data = await res.json();
        setResources(data); // Update state with real data

      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, [router]); // Only re-run if router changes

  // Send filter/sort/search query to backend and receive filtered resources
  useEffect(() => {
    const fetchFilteredResources = async () => {

      const filters = {
        course: selectedCourse,
        school: selectedSchool,
        sort: sortOption,
        q: searchQuery
      };

      const queryString = new URLSearchParams(filters).toString();

      try {
        const response = await fetch(`${ServerUrl}/resources/public?${queryString}`, { credentials: "include" });
        const data = await response.json();
        setFilteredResources(data || []);
        // Repopulate list of school/course filters


      } catch (error) {
        console.error("Error fetching filtered resources:", error);
        setFilteredResources([]);

      }
    };

    fetchFilteredResources();
  }, [searchQuery, selectedSchool, selectedCourse, sortOption]);

  return resources ? (
    <div className="flex flex-col w-full justify-center items-center p-6">
      <div className="container">
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-2xl font-bold">Community Resources</h1>
        </div>
        <CommunityFilters
          allSchools={availableSchools}
          allCourses={availableCourses}
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
                key={resource._id}
                _id={resource._id}
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
      <Button className={"my-3"}>
        Load More
      </Button>
    </div>
  ) : (
    <Loading />
  );
}
