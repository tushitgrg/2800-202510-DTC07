import { cn } from "@/lib/utils";
// Component Imported from Shadcn (ui.shadcn.com)
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
