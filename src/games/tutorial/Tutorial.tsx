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
  const [score, setScore] = useState(0);
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
    EventBus.on("increment-score", () => {
      setScore((score) => (score += 10));
    });
    EventBus.on("game-over", () => {
      setIsGameOver(true);
    });
    return () => {
      EventBus.removeAllListeners();
    };
  }, []);

  const startOver = () => {
    setIsGameOver(false);
    setScore(0);
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
          <>
            <div className="text-5xl font-semibold text-white justify-self-start ml-2">
              Score: {score}
            </div>
            <div className="m-2 flex self-end place-content-between">
              <DPad config={DPadConfiguration.LEFT_RIGHT} />
              <PressableButton eventName="JUMP" className="size-12">
                <img
                  src="/assets/controls/face/shadedDark36.png"
                  draggable={false}
                />
              </PressableButton>
            </div>
          </>
        )}
      </Overlay>
    </Root>
  );
}

export default Tutorial;
