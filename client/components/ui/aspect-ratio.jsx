"use client";
// Component Imported from Shadcn (ui.shadcn.com)
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({ ...props }) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
