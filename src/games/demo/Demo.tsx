import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Phaser, { Game } from "phaser";
import { MainMenu, PlayableScene } from "./scenes";
import StartGame from "./main";
import { EventBus } from "../EventBus";
import { Button } from "@/components/ui/button";
import { Container, Overlay, Root } from "@/components/ui/layout";

function Demo() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const gameRef = useRef<Game>();
  const sceneRef = useRef<PlayableScene>();

  const changeScene = () => {
    const scene = sceneRef.current;

    if (scene) {
      scene.changeScene();
    }
  };

  const moveSprite = () => {
    // const scene = phaserRef.current.scene;
    const scene = sceneRef.current;

    if (scene instanceof MainMenu) {
      scene.moveLogo();
    }
  };

  const addSprite = () => {
    // const scene = phaserRef.current.scene;
    const scene = sceneRef.current;

    if (scene) {
      // Add more stars
      const x = Phaser.Math.Between(64, scene.scale.width - 64);
      const y = Phaser.Math.Between(64, scene.scale.height - 64);

      //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
      const star = scene.add.sprite(x, y, "star");

      //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
      //  You could, of course, do this from within the Phaser Scene code, but this is just an example
      //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
      scene.add.tween({
        targets: star,
        duration: 500 + Math.random() * 1000,
        alpha: 0,
        yoyo: true,
        repeat: -1,
      });
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
    EventBus.on("current-scene-ready", (currentScene: PlayableScene) => {
      setCanMoveSprite(!(currentScene instanceof MainMenu));
      sceneRef.current = currentScene;
    });

    return () => {
      EventBus.removeListener("current-scene-ready");
    };
  }, []);

  return (
    <Root>
      <Container id="game-container" />
      <Overlay className="flex gap-x-2 justify-end items-end">
        <Button className="mb-2" onClick={changeScene}>
          Change Scene
        </Button>
        <Button className="mb-2" disabled={canMoveSprite} onClick={moveSprite}>
          Toggle Movement
        </Button>
        <Button className="mb-2 mr-2" onClick={addSprite}>
          Add New Sprite
        </Button>
      </Overlay>
    </Root>
  );
}

export default Demo;
