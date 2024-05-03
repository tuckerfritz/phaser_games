import { Game } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-container",
    mode: Phaser.Scale.FIT,
    width: 512,
    height: 512,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 650 },
      debug: false,
    },
  },
  scene: [MainMenu, Game],
};

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
