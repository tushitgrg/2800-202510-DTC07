import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to build and merge CSS class names for Tailwind.
 * Uses `clsx` to conditionally join class names and `twMerge` to
 * deduplicate conflicting Tailwind utility classes.
 *
 * @param {...import('clsx').ClassValue} inputs - Class values (strings, objects, arrays) to merge.
 * @returns {string} A merged string of class names with Tailwind conflicts resolved.
 */
export function cn(...inputs) {
  // First combine conditional classes, then merge Tailwind-specific conflicts
  return twMerge(clsx(inputs));
}
