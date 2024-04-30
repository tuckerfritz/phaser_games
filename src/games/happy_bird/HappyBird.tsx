import { Container, Overlay, Root } from "@/components/ui/layout";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Game } from "phaser";
import StartGame from "./main";
import { EventBus } from "../EventBus";
import { Button } from "@/components/ui/button";

const HappyBird = () => {
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
    EventBus.on("game-over", () => {
      setIsGameOver(true);
    });

    EventBus.on("update-score", (score: number) => {
      setScore(score);
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
        <div className="text-5xl font-semibold text-white justify-self-start ml-2  ">
          {score}
        </div>
        {isGameOver && (
          <Button className="justify-self-center" onClick={startOver}>
            Start Over
          </Button>
        )}
      </Overlay>
    </Root>
  );
};

export default HappyBird;
