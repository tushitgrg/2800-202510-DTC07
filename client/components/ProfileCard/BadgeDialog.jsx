"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function BadgeDialog({
  isOpen,
  setIsOpen,
  badges,
  selectedBadge,
  setSelectedBadge,
  tiers,
}) {
  // Handle equipping a badge
  const handleEquipBadge = (badge) => {
    console.log("Equipping badge:", badge);
    // API call to update the user's equipped badge to be implemented....
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-background rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => {
            setIsOpen(false);
            setSelectedBadge(null);
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <h2 className="text-xl font-bold mb-4">Badge Collection</h2>
        {selectedBadge ? (
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div
                className={`size-20 rounded-full ${selectedBadge.color} flex items-center justify-center`}
              >
                {selectedBadge.icon}
              </div>
              <div>
                <h3 className="font-bold">{selectedBadge.displayName}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedBadge.description.replace(
                    "{threshold}",
                    selectedBadge.count,
                  )}
                </p>

                {!selectedBadge.isLocked && (
                  <div className="mt-3 flex gap-2">
                    <Button onClick={() => handleEquipBadge(selectedBadge)}>
                      Equip as Avatar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedBadge(null)}
                    >
                      Back to All Badges
                    </Button>
                  </div>
                )}

                {selectedBadge.isLocked && (
                  <div className="mt-3">
                    <p className="text-muted-foreground">
                      Complete {tiers.bronze.threshold}{" "}
                      {selectedBadge.name.toLowerCase()} activities to unlock
                      this badge.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setSelectedBadge(null)}
                    >
                      Back to All Badges
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                  badge.isLocked ? "opacity-60" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedBadge(badge)}
              >
                <div
                  className={`size-16 rounded-full ${badge.color} flex items-center justify-center`}
                >
                  {badge.icon}
                </div>
                <h4 className="font-medium text-sm text-center">
                  {badge.displayName}
                </h4>

                {!badge.isLocked ? (
                  <div className="text-xs text-center text-muted-foreground">
                    {badge.count} {badge.name.toLowerCase()} completed
                  </div>
                ) : (
                  <div className="text-xs text-center text-muted-foreground">
                    {tiers.bronze.threshold - badge.count} more to unlock
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
