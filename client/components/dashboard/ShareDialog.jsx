"use client";

import { useState, useEffect } from "react";
import { Link, Globe, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientUrl } from "@/lib/urls";
import toast from "react-hot-toast";

export default function ShareDialog({ isOpen, onClose, resource, handleShare }) {
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

  const handlecopylink = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(
          `${ClientUrl}/resource/${resource.id}`
        );
        toast.success("Copied!", {
          duration: 4000,
          position: "bottom-right",
        });
      } catch {
        toast.error("Could not copy to clipboard.", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    }
  };
  // Handle share button click
  const handleSharePrivate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          url: `${ClientUrl}/resource/${resource.id}`,
        });
      } catch (e) {}
    } else {
      toast.error("Web Share API is not supported in this browser.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  const handleSharePublic = () => {
    handleShare(
      resource.id,
      title,
      school? school : null,
      course? course : null,
      true
    );
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
                value={resource.school ? resource.school : searchSchool}
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="space-x-1 cursor-pointer"
                onClick={handlecopylink}
              >
                <Clipboard className="h-4 w-4" />
                <span>Copy</span>
              </Button>

              <Button
                variant="outline"
                className="space-x-1 cursor-pointer"
                onClick={handleSharePrivate}
              >
                <Link className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>

            {!resource.isOwner ? (
              <div className="relative group cursor-not-allowed">
                <Button className="space-x-2" disabled>
                  <Globe className="h-4 w-4" />
                  <span>Share to Public</span>
                </Button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  You can only share resources that you have created!
                </div>
              </div>
            ) : (
              <Button
                className="space-x-2 cursor-pointer"
                onClick={handleSharePublic}
              >
                <Globe className="h-4 w-4" />
                <span>Share to Public</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
