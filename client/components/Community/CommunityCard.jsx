"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ResourceCard({
  resource,
  title,
  author,
  createdAt,
  shareCount,
  likes,
  school,
  course,
}) {
  return (
    // <Link href={`/resource/${resource.id}`}>
    <div className="block border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col justify-between p-4 h-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <div className="text-sm text-gray-600 space-y-2 mb-4">
          <Badge className={"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 overflow-hidden"}>{school} </Badge>
          <Badge className={"bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300 block"}>{course} </Badge>
        </div>

        <div className="mt-auto flex justify-between items-end text-sm text-gray-500">
          <div className="flex space-x-4">
            <span>🔗 {shareCount}</span>
            <span>❤️ {likes}</span>
          </div>
          <div className="text-right">
            <p className="text-gray-600">{author ?? "Unknown"}</p>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}