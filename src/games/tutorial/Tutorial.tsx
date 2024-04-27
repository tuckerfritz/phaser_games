import { Container, Overlay, Root } from "@/components/ui/layout";
import { Game } from "phaser";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import StartGame from "./main";
import { EventBus } from "../EventBus";
import { Button } from "@/components/ui/button";

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
      <Overlay className="grid place-items-center">
        {isGameOver && <Button onClick={startOver}>Start Over</Button>}
      </Overlay>
    </Root>
  );
}

export default Tutorial;
