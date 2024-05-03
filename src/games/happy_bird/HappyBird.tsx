import { Container, Overlay, Root } from "@/components/ui/layout";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import StartGame from "./main";
import { EventBus } from "../EventBus";
import { Game } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import GameOverMenu from "./components/GameOverMenu";
import StartMenu from "./components/StartMenu";

const HappyBird = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentSceneKey, setCurrentSceneKey] = useState<"MainMenu" | "Game">(
    "MainMenu",
  );
  const gameRef = useRef<Phaser.Game>();
  const sceneRef = useRef<MainMenu | Game>();

  const startGame = () => {
    if (sceneRef.current instanceof MainMenu) {
      sceneRef.current.changeScene();
    }
  };

  const restartGame = () => {
    setIsGameOver(false);
    setScore(0);
    if (gameRef.current !== undefined) {
      gameRef.current.destroy(true);
      gameRef.current = StartGame("game-container");
      gameRef.current.scene.start("Game");
      sceneRef.current = gameRef.current.scene.getScene("Game") as Game;
    }
  };

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
    EventBus.on("change-scene", (sceneKey: "MainMenu" | "Game") => {
      setCurrentSceneKey(sceneKey);
    });
    EventBus.on("current-scene-ready", (currentScene: MainMenu | Game) => {
      sceneRef.current = currentScene;
    });
    return () => {
      EventBus.removeAllListeners();
    };
  }, []);

  return (
    <Root>
      <Container id="game-container" />
      <Overlay className="grid">
        {currentSceneKey === "Game" ? (
          <GameOverMenu
            score={score}
            isGameOver={isGameOver}
            restartGame={restartGame}
          />
        ) : (
          <StartMenu startGame={startGame} />
        )}
      </Overlay>
    </Root>
  );
};

export default HappyBird;
