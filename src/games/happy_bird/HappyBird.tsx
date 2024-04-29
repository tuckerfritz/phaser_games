import { Container, Overlay, Root } from "@/components/ui/layout";
import { useLayoutEffect, useRef } from "react";
import { Game } from "phaser";
import StartGame from "./main";

const HappyBird = () => {
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

  return (
    <Root>
      <Container id="game-container" />
      <Overlay className="grid place-items-center"></Overlay>
    </Root>
  );
};

export default HappyBird;
