"use client";

export default function ResourceFooter({ resource, formatDate }) {
  return (
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: "50%" }}
        ></div>
      </div>
      <div className="flex w-full pt-2">
        <span className="text-sm w-full text-right text-gray-500">
          {formatDate(resource.createdAt || resource.date)}
        </span>
      </div>
    </div>
  );
}