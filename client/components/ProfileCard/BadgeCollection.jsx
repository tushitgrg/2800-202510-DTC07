"use client";

import { useState } from "react";

export default function BadgeCollection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userBadges, setUserBadges] = useState([
    { id: "quiz", count: 37, equipped: false },
    { id: "flashcard", count: 102, equipped: false },
    { id: "summary", count: 12, equipped: false },
    { id: "community_resource", count: 5, equipped: true },
    { id: "streak", count: 7, equipped: false },
    { id: "resource", count: 154, equipped: false },
  ]);

  // Badge tier information
  const tiers = {
    bronze: { color: "bg-amber-600", name: "Novice", threshold: 5 },
    silver: { color: "bg-gray-400", name: "Enthusiast", threshold: 50 },
    gold: { color: "bg-yellow-400", name: "Expert", threshold: 100 },
    platinum: { color: "bg-slate-300", name: "Master", threshold: 500 },
    ruby: { color: "bg-red-600", name: "Scholar", threshold: 1000 }
  };

  // Badge type configuration
  const badgeTypes = [
    {
      id: "quiz",
      name: "Quiz",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M8 7h6" />
          <path d="M8 11h8" />
          <path d="M8 15h5" />
        </svg>
      ),
      description: "Complete {threshold} quizzes"
    },
    {
      id: "flashcard",
      name: "Flashcard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
        </svg>
      ),
      description: "Complete {threshold} flashcard sets"
    },
    {
      id: "summary",
      name: "Summary",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
      description: "Complete {threshold} summaries"
    },
    {
      id: "community_resource",
      name: "Contributor",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      description: "Add {threshold} resources to the community"
    },
    {
      id: "share",
      name: "Sharer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      ),
      description: "Share {threshold} resources with the community"
    },
    {
      id: "community_quiz",
      name: "Quiz Explorer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      ),
      description: "Complete {threshold} community quizzes"
    },
    {
      id: "community_flashcard",
      name: "Card Explorer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 2v5h5" />
          <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z" />
          <path d="M3 10v6.5c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-9c0-.8-.7-1.5-1.5-1.5H8l-5 5z" />
          <path d="M8 10h8" />
          <path d="M8 14h4" />
        </svg>
      ),
      description: "Complete {threshold} community flashcard sets"
    },
    {
      id: "community_summary",
      name: "Summary Explorer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      description: "Complete {threshold} community summaries"
    },
    {
      id: "streak",
      name: "Scholar",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
      description: "Maintain a {threshold}-day study streak"
    },
    {
      id: "resource",
      name: "Resource",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      description: "Complete {threshold} resources"
    }
  ];

  // Get badge tier based on count
  const getBadgeTier = (count) => {
    if (count >= tiers.ruby.threshold) return "ruby";
    if (count >= tiers.platinum.threshold) return "platinum";
    if (count >= tiers.gold.threshold) return "gold";
    if (count >= tiers.silver.threshold) return "silver";
    if (count >= tiers.bronze.threshold) return "bronze";
    return null;
  };

  // Get badge info by combining type and tier
  const getBadgeInfo = (badgeId, count, equipped) => {
    const badgeType = badgeTypes.find(type => type.id === badgeId);
    if (!badgeType) return null;

    const tier = getBadgeTier(count);

    return {
      ...badgeType,
      tier,
      tierName: tier ? tiers[tier].name : "Locked",
      color: tier ? tiers[tier].color : "bg-gray-300",
      displayName: tier ? `${badgeType.name} ${tiers[tier].name}` : `${badgeType.name} Badge`,
      count,
      isLocked: !tier,
      equipped
    };
  };

  // Process all badge types with user data
  const processedBadges = userBadges.map(badge =>
    getBadgeInfo(badge.id, badge.count, badge.equipped)
  ).filter(badge => badge !== null && !badge.isLocked);

  // Handle equipping a badge
  const handleEquipBadge = (badgeId) => {
    setUserBadges(userBadges.map(badge => ({
      ...badge,
      equipped: badge.id === badgeId
    })));
  };

  return (
    <div className="mt-2">
      <div className="mb-3">
        <h3 className="text-sm font-medium">Badge Collection</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {processedBadges.slice(0, 6).map(badge => (
          <div
            key={badge.id}
            className="group relative cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className={`size-10 rounded-full ${badge.color} flex items-center justify-center hover:ring-1 hover:ring-primary transition-all`}>
              {badge.icon}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-popover text-popover-foreground text-xs p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <p className="font-bold">{badge.displayName}</p>
              {badge.tier ? (
                <p>{badge.description.replace('{threshold}', tiers[badge.tier].threshold)}</p>
              ) : (
                <p>{badge.description.replace('{threshold}', tiers.bronze.threshold)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Badge Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-background rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              className="absolute right-4 top-4 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsDialogOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
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

            <h2 className="text-xl font-bold mb-6">Badge Collection</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {processedBadges.map(badge => (
                <div
                  key={badge.id}
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors ${
                    badge.equipped ? 'border-primary ring-1 ring-primary' : 'border-border'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEquipBadge(badge.id);
                  }}
                >
                  <div className={`size-16 rounded-full ${badge.color} flex items-center justify-center ${
                    badge.equipped ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                  }`}>
                    {badge.icon}
                  </div>
                  <h4 className="font-medium text-sm text-center">{badge.displayName}</h4>

                  <div className="text-xs text-center text-muted-foreground">
                    {badge.tier ? (
                      <p>{badge.description.replace('{threshold}', tiers[badge.tier].threshold)}</p>
                    ) : (
                      <p>{badge.description.replace('{threshold}', tiers.bronze.threshold)}</p>
                    )}
                  </div>

                  {badge.equipped && (
                    <div className="inline-flex items-center bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Equipped
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}