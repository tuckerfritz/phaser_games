import { Container, Overlay, Root } from "@/components/ui/layout";
import { Game } from "phaser";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import StartGame from "./main";
import { EventBus } from "../EventBus";
import { Button } from "@/components/ui/button";
import DPad, { DPadConfiguration } from "@/components/controls/dpad";
import PressableButton from "@/components/controls/PressableButton";

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

  return (
    <Root>
      <Container id="game-container" />
      <Overlay className="grid">
        {isGameOver ? (
          <Button className="place-self-center" onClick={startOver}>
            Start Over
          </Button>
        ) : (
          <div className="m-2 flex self-end place-content-between">
            <DPad config={DPadConfiguration.LEFT_RIGHT} />
            <PressableButton eventName="JUMP" className="size-12">
              <img src="/assets/controls/face/shadedDark36.png" />
            </PressableButton>
          </div>
        )}
      </Overlay>
    </Root>
  );
}

export default Tutorial;
