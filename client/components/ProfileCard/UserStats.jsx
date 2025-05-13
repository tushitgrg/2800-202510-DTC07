"use client";

export default function UserStats({ resources }) {
  return (
    <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6 items-center">
      {/* Study streak */}
      <div className="flex flex-col items-center">
        <div className="flex items-center text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
          <span className="text-lg font-semibold">5</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Day streak</p>
      </div>

      {/* Resources */}
      <div className="flex flex-col items-center">
        <div className="flex items-center text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          <span className="text-lg font-semibold">{resources ? resources.length : 0}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Resources</p>
      </div>

      {/* Number of shares */}
      <div className="flex flex-col items-center">
        <div className="flex items-center text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span className="text-lg font-semibold">12</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Shares</p>
      </div>
    </div>
  );
}