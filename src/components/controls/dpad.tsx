export enum DPadConfiguration {
  LEFT_RIGHT,
  UP_DOWN_LEFT_RIGHT,
}

export enum DPadDirection {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

interface DPadProps {
  className?: string;
  config: DPadConfiguration;
  onPointer: (
    event: React.PointerEvent<HTMLButtonElement>,
    direction: DPadDirection,
  ) => void;
}

const DPad = ({ className, config, onPointer }: DPadProps) => {
  return config == DPadConfiguration.LEFT_RIGHT ? (
    <div className={`flex gap-2 w-20 ${className}`}>
      <button
        onPointerDown={(e) => onPointer(e, DPadDirection.LEFT)}
        onPointerUp={(e) => onPointer(e, DPadDirection.LEFT)}
        onPointerLeave={(e) => onPointer(e, DPadDirection.LEFT)}
      >
        <img
          draggable={false}
          className="rotate-90"
          src="/assets/controls/dpad/shadedDark10.png"
        />
      </button>
      <button
        onPointerDown={(e) => onPointer(e, DPadDirection.RIGHT)}
        onPointerUp={(e) => onPointer(e, DPadDirection.RIGHT)}
        onPointerLeave={(e) => onPointer(e, DPadDirection.RIGHT)}
      >
        <img
          draggable={false}
          className="-rotate-90"
          src="/assets/controls/dpad/shadedDark10.png"
        />
      </button>
    </div>
  ) : null;
};

export default DPad;
