"use client";

export default function ExperienceBar() {
  return (
    <div className="flex flex-col min-w-[200px]">
      <div className="flex justify-between items-end mb-2">
        <div className="text-sm font-medium">Experience</div>
        <div className="text-xs text-muted-foreground">GOLD 3 (7,530 XP)</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
        <div
          className="bg-gradient-to-r from-primary to-purple-600 h-2.5 rounded-full"
          style={{ width: "75%" }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>1,890 XP to next level</span>
        <span>75%</span>
      </div>
    </div>
  );
}