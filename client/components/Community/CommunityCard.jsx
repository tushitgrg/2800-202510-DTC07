"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

/**
 * Card component for displaying a community resource
 *
 * @param {Object} props - CommunityCard component props
 * @param {string} props._id - Unique resource identifier
 * @param {string} props.title - Title of the resource
 * @param {string} [props.author] - Author of the resource
 * @param {string|Date} props.createdAt - date-time string or Date object representing when the resource was created
 * @param {number} props.shareCount - Number of times the resource was shared
 * @param {number} props.likes - Number of likes the resource has received
 * @param {string} [props.school] - Optional school name associated with the resource
 * @param {string} [props.course] - Optional course name associated with the resource
 * @returns {JSX.Element} Rendered community resource card
 */
export default function CommunityCard({
  _id,
  title,
  author,
  createdAt,
  shareCount,
  likes,
  school,
  course,
}) {
  // Format creation date for display
  const displayDate = new Date(createdAt).toLocaleDateString();

  return (
    // Wrap the card in a link to the resource detail page
    <Link href={`/resource/${_id}`} className="h-full">
      <div className="block border-2 rounded-lg hover:shadow-md transition-shadow overflow-hidden h-full">
        <div className="flex flex-col justify-between p-4 h-full">
          {/* Title of the resource */}
          <h2 className="text-lg font-semibold mb-2">{title}</h2>

          {/* Display badges for school and course if provided */}
          <div className="text-sm text-gray-600 space-y-2 mb-4">
            {school && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 overflow-hidden">
                {school}
              </Badge>
            )}
            {course && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300 block">
                {course}
              </Badge>
            )}
          </div>

          {/* Share and like counts, and author/creation info */}
          <div className="mt-auto flex justify-between items-end text-sm text-gray-500">
            <div className="flex space-x-4">
              {/* Share count icon and number */}
              <span>🔗 {shareCount}</span>
              {/* Like count icon and number */}
              <span>❤️ {likes}</span>
            </div>
            <div className="text-right">
              {/* Author name */}
              <p className="text-gray-600">Created by: {author ?? "Unknown"}</p>
              {/* Formatted creation date */}
              <p>{displayDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
