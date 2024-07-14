import PressableButton from "@/components/controls/PressableButton";

export enum DPadConfiguration {
  LEFT_RIGHT,
  UP_DOWN_LEFT_RIGHT,
}

interface DPadProps {
  className?: string;
  config: DPadConfiguration;
}

const DPad = ({ className, config }: DPadProps) => {
  return config == DPadConfiguration.LEFT_RIGHT ? (
    <div className={`flex gap-2 w-20 ${className}`}>
      <PressableButton eventName="LEFT">
        <img
          draggable={false}
          className="rotate-90"
          src="/assets/controls/dpad/shadedDark27.png"
        />
      </PressableButton>
      <PressableButton eventName="RIGHT">
        <img
          draggable={false}
          className="-rotate-90"
          src="/assets/controls/dpad/shadedDark27.png"
        />
      </PressableButton>
    </div>
  ) : null;
};

export default DPad;
