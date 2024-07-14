import { Container, Overlay, Root } from "@/components/ui/layout";
import { Game } from "phaser";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import StartGame from "./main";
import { EventBus } from "../EventBus";
import { Button } from "@/components/ui/button";
import DPad, { DPadConfiguration, DPadDirection } from "@/components/ui/dpad";

function Tutorial() {
  const [isGameOver, setIsGameOver] = useState(false);
  const gameRef = useRef<Game>();

  useLayoutEffect(() => {
    if (gameRef.current === undefined) {
      gameRef.current = StartGame("game-container");
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    EventBus.on("game-over", () => {
      setIsGameOver(true);
    });

    return () => {
      EventBus.removeListener("game-over");
    };
  }, []);

  const startOver = () => {
    setIsGameOver(false);
    if (gameRef) {
      gameRef.current.destroy(true);
      gameRef.current = StartGame("game-container");
    }
  };

  const onPointer = (
    event: React.PointerEvent<HTMLButtonElement>,
    direction: DPadDirection,
  ) => {
    if (direction === DPadDirection.LEFT) {
      if (event.type === "pointerdown") {
        EventBus.emit("LEFT", "pressed");
      } else {
        EventBus.emit("LEFT", "released");
      }
    } else {
      if (event.type === "pointerdown") {
        EventBus.emit("RIGHT", "pressed");
      } else {
        EventBus.emit("RIGHT", "released");
      }
    }
  };

  return (
    <Root>
      <Container id="game-container" />
      <Overlay className="grid">
        {isGameOver ? (
          <Button className="place-self-center" onClick={startOver}>
            Start Over
          </Button>
        ) : (
          <DPad
            className="self-end justify-self-start ml-2"
            config={DPadConfiguration.LEFT_RIGHT}
            onPointer={onPointer}
          />
        )}
      </Overlay>
    </Root>
  );
}

export default Tutorial;
