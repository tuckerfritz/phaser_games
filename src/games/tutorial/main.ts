import { Game } from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-container",
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  scene: [Game],
};

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
