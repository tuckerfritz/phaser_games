import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Phaser, { Game } from "phaser";
import { MainMenu, PlayableScene } from "./game/scenes";
import StartGame from "./game/main";
import { EventBus } from "./game/EventBus";

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const gameRef = useRef<Game>();
  const sceneRef = useRef<PlayableScene>();
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

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
      // Get the update logo position
      scene.moveLogo(({ x, y }) => {
        setSpritePosition({ x, y });
      });
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
    if(gameRef.current === undefined) {
      gameRef.current = StartGame("game-container");
    }

    return () => {
      if(gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = undefined
      }
    }
  }, [])

  useEffect(() => {
    EventBus.on("current-scene-ready", (currentScene: PlayableScene) => {
      setCanMoveSprite(!(currentScene instanceof MainMenu))
      sceneRef.current = currentScene
    })

    return () => {
      EventBus.removeListener("current-scene-ready");
    }
  }, [])

  return (
    <div id="app">
      <div id="game-container"></div>
      <div>
        <div>
          <button className="button" onClick={changeScene}>
            Change Scene
          </button>
        </div>
        <div>
          <button
            disabled={canMoveSprite}
            className="button"
            onClick={moveSprite}
          >
            Toggle Movement
          </button>
        </div>
        <div className="spritePosition">
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <div>
          <button className="button" onClick={addSprite}>
            Add New Sprite
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
