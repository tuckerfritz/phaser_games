import { Game } from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 650 },
      debug: false,
    },
  },
  scene: [Game],
};

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
