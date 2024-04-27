import { Container, Overlay, Root } from "@/components/ui/layout"
import { Game } from "phaser";
import { useLayoutEffect, useRef } from "react"
import StartGame from "./main";

function Tutorial() {

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
      <Overlay className="flex gap-x-2 justify-end items-end">
      </Overlay>
    </Root>
  );
}

export default Tutorial;