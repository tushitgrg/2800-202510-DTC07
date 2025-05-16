"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommunityFilters from "@/components/Community/CommunityFilters";
import CommunityCard from "@/components/Community/CommunityCard";
import CommunityRec from "@/components/Community/CommunityRec";
import Loading from "@/components/Loading";
import { ServerUrl } from "@/lib/urls";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsDown } from "lucide-react";

export default function CommunityPage() {
  const [resources, setResources] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Text for the title search input
  const [selectedSchool, setSelectedSchool] = useState(""); // Value for school dropdown
  const [selectedCourse, setSelectedCourse] = useState(""); // Value for course dropdown
  const [sortOption, setSortOption] = useState("createdAt:desc"); // Value for active sort (default Newest)
  const [filteredResources, setFilteredResources] = useState([]);
  const [page, setPage] = useState(1); // Value for how many card components to load
  const [hasMore, setHasMore] = useState(true); // Disable button if there are no cards to load
  const [allSchools, setAllSchools] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Obtain the dropdown options from filteredResources
  const availableCourses = useMemo(
    () => Array.from(new Set(allCourses.filter(Boolean))),
    [allCourses],
  );

  const availableSchools = useMemo(
    () => Array.from(new Set(allSchools.filter(Boolean))),
    [allSchools],
  );

  // Load more button handle
  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchFilteredResources(nextPage, true);
    setPage(nextPage);
  };

  // Fetch backend data on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // URL to public resources endpoint (Obtain all public resources)
        const res = await fetch(`${ServerUrl}/resources/public`, {
          credentials: "include",
        });
        if ([401, 201].includes(res.status))
          return router.push(`${ServerUrl}/auth/google`);
        if (!res.ok) throw new Error("Failed to fetch resources");
        const data = await res.json();
        setResources(data); // Update state with real data
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, [router]); // Only re-run if router changes

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${ServerUrl}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const userData = await res.json();
        console.log("Fetched user from root:", userData);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  // Send filter/sort/search query to backend and receive filtered resources
  const fetchFilteredResources = async (pageToFetch = 1, append = false) => {
    const filters = {
      course: selectedCourse,
      school: selectedSchool,
      sort: sortOption,
      q: searchQuery,
      page: pageToFetch,
    };

    const queryString = new URLSearchParams(filters).toString();

    try {
      const response = await fetch(
        `${ServerUrl}/resources/public?${queryString}`,
        { credentials: "include" },
      );
      const result = await response.json();

      // Appends loaded card components to current card components
      if (append) {
        setFilteredResources((prev) => [...prev, ...result.data]);
      } else {
        setFilteredResources(result.data);
      }

      // Update dropdowns
      setAllSchools(result.allSchools || []);
      setAllCourses(result.allCourses || []);

      if (result.data.length < 18 || pageToFetch * 18 >= result.totalCount) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching filtered resources:", error);
      if (!append) setFilteredResources([]);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1
    setHasMore(true); // Reset load more button
    fetchFilteredResources(1, false); // Replace data
  }, [searchQuery, selectedSchool, selectedCourse, sortOption]);

  return resources ? (
    <div className="flex flex-col w-full justify-center items-center p-6">
      <div className="container">
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-2xl font-bold">Community Resources</h1>
        </div>
        <CommunityRec userSchool={user?.school} />
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
      <Button
        onClick={handleLoadMore}
        variant="outline"
        size="md"
        className="my-3 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl 
            transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200 bg-gradient-to-r"
      >
        <ChevronsDown className="mr-2 h-4 w-4" />
        Load More
      </Button>
    </div>
  ) : (
    <Loading />
  );
}
