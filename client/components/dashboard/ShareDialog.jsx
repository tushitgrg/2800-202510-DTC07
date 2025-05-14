"use client";

import { useState, useEffect } from "react";
import { Link, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientUrl } from "@/lib/urls";

export default function ShareDialog({ isOpen, onClose, resource, onShare }) {
  const [title, setTitle] = useState(resource?.title || "");
  const [school, setSchool] = useState("");
  const [course, setCourse] = useState("");
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchSchool, setSearchSchool] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  useEffect(() => {
    if (resource) {
      setTitle(resource.title);
    }
  }, [resource]);

  // Mock data for schools
  useEffect(() => {
    const mockSchools = [
      { id: "1", name: "University of Washington" },
      { id: "2", name: "Stanford University" },
      { id: "3", name: "Massachusetts Institute of Technology" },
      { id: "4", name: "Harvard University" },
      { id: "5", name: "British Columbia Institute of Technology" },
    ];
    setSchools(mockSchools);
  }, []);

  // Mock data for courses
  useEffect(() => {
    if (school) {
      const mockCourses = [
        { id: "1", name: "Introduction to Computer Science" },
        { id: "2", name: "Data Structures and Algorithms" },
        { id: "3", name: "Machine Learning" },
        { id: "4", name: "Web Development" },
        { id: "5", name: "Database Systems" },
      ];
      setCourses(mockCourses);
    } else {
      setCourses([]);
    }
  }, [school]);

  // Filter schools based on search
  const filteredSchools = schools.filter((s) =>
    s.name.toLowerCase().includes(searchSchool.toLowerCase())
  );

  // Filter courses based on search
  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  // Handle share button click
  const handleSharePrivate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          url: `${ClientUrl}/resource/${resource.id}`,
        });
      } catch (e) {
        console.log("hi");
      }
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
    // onShare({
    //   title,
    //   school: school || null,
    //   course: course || null,
    //   isPublic: false
    // });
    // onClose();
  };

  const handleSharePublic = () => {
    onShare({
      title,
      school: school || null,
      course: course || null,
      isPublic: true,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-background rounded-lg w-full max-w-md p-6 relative">
        <button
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <h2 className="text-xl font-bold mb-6">Share Resource</h2>

        <div className="space-y-4">
          {/* Resource Title */}
          <div className="space-y-2">
            <label htmlFor="resource-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="resource-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resource title"
            />
          </div>

          {/* School Selection */}
          <div className="space-y-2">
            <label htmlFor="school-select" className="text-sm font-medium">
              Choose your school (optional)
            </label>
            <div className="relative">
              <Input
                id="school-search"
                value={searchSchool}
                onChange={(e) => setSearchSchool(e.target.value)}
                placeholder="Search for a school"
                className="mb-1"
              />
              {searchSchool && (
                <div className="absolute z-10 w-full bg-background border rounded-md max-h-48 overflow-y-auto">
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((s) => (
                      <div
                        key={s.id}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setSchool(s.id);
                          setSearchSchool(s.name);
                        }}
                      >
                        {s.name}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-muted-foreground">
                      No schools found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Course Selection - Only show if school is selected */}
          {school && (
            <div className="space-y-2">
              <label htmlFor="course-select" className="text-sm font-medium">
                Course (optional)
              </label>
              <div className="relative">
                <Input
                  id="course-search"
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  placeholder="Search for a course"
                  className="mb-1"
                />
                {searchCourse && (
                  <div className="absolute z-10 w-full bg-background border rounded-md max-h-48 overflow-y-auto">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((c) => (
                        <div
                          key={c.id}
                          className="p-2 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            setCourse(c.id);
                            setSearchCourse(c.name);
                          }}
                        >
                          {c.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-muted-foreground">
                        No courses found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="space-x-2"
              onClick={handleSharePrivate}
            >
              <Link className="h-4 w-4" />
              <span>Private Link</span>
            </Button>
            <Button className="space-x-2" onClick={handleSharePublic}>
              <Globe className="h-4 w-4" />
              <span>Share to Public</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
