import { cn, useResizeObserver } from "@/lib/utils";
import React, { useState } from "react";

const Root = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} id="game-root" className={cn("grid", className)} {...props} />
));

Root.displayName = "Root";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("[grid-area:1/1]", className)} {...props} />
));

Container.displayName = "Container";

const Overlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });

  useResizeObserver((entries) => {
    for (const entry of entries) {
      setDimensions({
        width: Number(entry.target.getAttribute("width")),
        height: Number(entry.target.getAttribute("height")),
      });
    }
  }, "canvas");

  return (
    <div
      ref={ref}
      style={{ width, height }}
      className={cn("[grid-area:1/1]", className)}
      {...props}
    />
  );
});

Overlay.displayName = "Overlay";

export { Root, Container, Overlay };
