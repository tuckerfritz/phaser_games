import { EventBus } from "@/games/EventBus";

export class MainMenu extends Phaser.Scene {
  private bg: Phaser.GameObjects.TileSprite;

  constructor() {
    super("MainMenu");
  }

  preload() {
    this.load.image("background", "assets/happy_bird/background.png");
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, 512, 512, "background").setScale(2, 2);
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.bg.setTilePosition(this.bg.tilePositionX + 0.1);
  }

  changeScene() {
    EventBus.emit("change-scene", "Game");
    this.scene.start("Game");
  }
}
