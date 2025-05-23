"use client";

import { useState, useEffect, useMemo } from "react";
import { Link, Globe, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientUrl, ServerUrl } from "@/lib/urls";
import toast from "react-hot-toast";

/**
 * Debounce function to limit the frequency of function calls
 * @param {Function} callback - Callback function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(callback, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

/**
 * Dialog component for sharing resources
 * Allows private sharing via link and public sharing with metadata
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when dialog is closed
 * @param {Object} props.resource - Resource object to be shared
 * @param {Function} props.handleShare - Function to handle sharing the resource
 * @returns {JSX.Element|null} The share dialog or null if not open
 */
export default function ShareDialog({
  isOpen,
  onClose,
  resource,
  handleShare,
}) {
  // State for form fields
  const [title, setTitle] = useState(resource?.title || "");
  const [school, setSchool] = useState("");
  const [course, setCourse] = useState("");
  const [searchSchool, setSearchSchool] = useState("");
  const [schoolList, setSchoolList] = useState([]);

  /**
   * Fetches matching schools based on search query
   * @param {string} q - Search query
   */
  const fetchSchools = async (q) => {
    if (!q) {
      setSchoolList([]);
      return;
    }
    const res = await fetch(
      `${ServerUrl}/school/search?q=${encodeURIComponent(q)}`,
      { credentials: "include" },
    );
    const data = await res.json();
    setSchoolList(data);
  };

  // Create memoized debounced fetch function to prevent excessive API calls
  const debouncedFetchSchools = useMemo(() => debounce(fetchSchools, 500), []);

  // Initialize form with resource title when resource changes
  useEffect(() => {
    if (resource) {
      setTitle(resource.title);
    }
  }, [resource]);

  /**
   * Copies the resource URL to clipboard
   */
  const handleCopyLink = async () => {
    if (navigator.clipboard) {
      try {
        const resourceId = resource.originalResourceId || resource.id;

        await navigator.clipboard.writeText(
          `${ClientUrl}/resource/${resourceId}`,
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

  /**
   * Shares the resource using Web Share API if available
   */
  const handleSharePrivate = async () => {
    if (navigator.share) {
      try {
        const resourceId = resource.originalResourceId || resource.id;
        console.log("Emanuel in frontend", resource.originalResourceId);

        await navigator.share({
          title: resource.title,
          url: `${ClientUrl}/resource/${resourceId}`,
        });
      } catch (e) {
        // Silently handle rejection (user canceled)
      }
    } else {
      toast.error("Web Share API is not supported in this browser.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  /**
   * Makes the resource public and adds metadata
   */
  const handleSharePublic = () => {
    const resourceId = resource.originalResourceId || resource.id;

    handleShare(resourceId, title, school || null, course || null, true);
    onClose();
  };

  // Don't render anything if dialog is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-background rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
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
                placeholder="Search for a school"
                onChange={(e) => {
                  const v = e.target.value;
                  setSearchSchool(v);
                  setSchool(v);
                  debouncedFetchSchools(v);
                }}
                className="mb-1"
              />
              {searchSchool && (
                <div className="absolute z-10 w-full bg-background rounded-md max-h-48 overflow-y-auto">
                  {schoolList.length > 0 ? (
                    schoolList.map((s, index) => (
                      <div
                        key={`${s.name}-${index}`}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setSchool(s.name);
                          setSearchSchool(s.name);
                          setSchoolList([]);
                        }}
                      >
                        {s.name}
                      </div>
                    ))
                  ) : (
                    <span className="hidden"></span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Course Selection - Only show if school is selected */}
          {school && (
            <div className="space-y-2">
              <label htmlFor="course-input" className="text-sm font-medium">
                Course (optional)
              </label>
              <Input
                id="course-input"
                value={course}
                onChange={(e) => {
                  const input = e.target.value.replace(/\s/g, "");
                  if (input.length <= 15) {
                    setCourse(input);
                  }
                }}
                placeholder="example: COMP150"
                className="rounded-full mt-1"
                maxLength={15}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="space-x-1 cursor-pointer"
                onClick={handleCopyLink}
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

            {!resource.isOwner || resource.isPublic ? (
              <div className="relative group cursor-not-allowed">
                <Button className="space-x-2" disabled>
                  <Globe className="h-4 w-4" />
                  <span>Share to Public</span>
                </Button>
                {!resource.isOwner ? (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    You can only share resources that you have created!
                  </div>
                ) : (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    This resource is already public!
                  </div>
                )}
              </div>
            ) : (
              <Button
                className="space-x-2 cursor-pointer"
                onClick={() => {
                  if (title) {
                    handleSharePublic();
                  } else {
                    toast.error("Cannot set empty title!", {
                      duration: 4000,
                      position: "bottom-right",
                    });
                  }
                }}
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
