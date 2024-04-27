import { cn } from "@/lib/utils";
import React, { useLayoutEffect, useState } from "react";

const Root = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid", className)} {...props} />
));

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("[grid-area:1/1]", className)} {...props} />
));

// const Container = (id: string) => <div id={id} className="[grid-area: 1/1]"/>

const Overlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const canvasHeight = document.querySelector("canvas")?.height ?? 0;
    const canvasWidth = document.querySelector("canvas")?.width ?? 0;
    setDimensions({ width: canvasWidth, height: canvasHeight });
  }, []);

  return (
    <div
      ref={ref}
      style={{ width, height }}
      className={cn("[grid-area:1/1]", className)}
      {...props}
    />
  );
});

// const Overlay = () => <div className="[grid-area: 1/1]"/>

export { Root, Container, Overlay };
