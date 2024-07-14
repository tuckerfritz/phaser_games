import * as React from "react";
import { EventBus } from "@/games/EventBus";

export interface PressableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  eventName: string;
}

const PressableButton = React.forwardRef<
  HTMLButtonElement,
  PressableButtonProps
>(({ className, children, eventName, ...props }, ref) => {
  const handlePointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.type === "pointerdown") {
      EventBus.emit(eventName, "pressed", event);
    } else {
      EventBus.emit(eventName, "released", event);
    }
  };

  return (
    <button
      onPointerDown={handlePointer}
      onPointerUp={handlePointer}
      onPointerLeave={handlePointer}
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
});

PressableButton.displayName = "Button";

export default PressableButton;
