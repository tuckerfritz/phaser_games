import { EventBus } from "@/games/EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  private bg: Phaser.GameObjects.TileSprite;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private pipes: Phaser.Physics.Arcade.StaticGroup;
  private spacebar: Phaser.Input.Keyboard.Key;
  private score: number = 0;
  private gameOver: boolean = false;
  private flapped: boolean = false;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("background", "assets/happy_bird/background.png");
    this.load.spritesheet("bird", "assets/happy_bird/bird.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("middle-pipe", "assets/happy_bird/middle-pipe.png");
    this.load.image("middle-pipe", "assets/happy_bird/end-pipe.png");
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, 512, 512, "background").setScale(2, 2);

    this.player = this.physics.add.sprite(256, 256, "bird").setScale(2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.player.body.world.on("worldbounds", (...args) => {
      const down: boolean = args[2];
      if (down) {
        this.player.setTint(0xff0000);
        this.game.pause();
        this.gameOver = true;
        EventBus.emit("game-over");
      }
    });
    this.anims.create({
      key: "space",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 3 }),
      frameRate: 60,
      repeat: 0,
    });

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  update() {
    this.bg.setTilePosition(this.bg.tilePositionX + 0.1);
    if (this.spacebar.isDown && this.flapped === false) {
      this.player.setVelocityY(-250);
      this.flapped = true;
    } else if (this.spacebar.isUp) {
      this.player.anims.play("space");
      this.flapped = false;
    }
  }
}
