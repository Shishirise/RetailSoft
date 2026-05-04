"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";

/**
 * Label component - Accessible form label
 * Associates text with form inputs for accessibility
 * Automatically handles disabled states and cursor behavior
 * 
 * Features:
 * - Proper semantic HTML for screen readers
 * - Disabled state styling when parent is disabled
 * - Gap support for icons or additional elements
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };