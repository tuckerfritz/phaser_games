import { EventBus } from "@/games/EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  private bg: Phaser.GameObjects.TileSprite;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private pipes: Phaser.Physics.Arcade.StaticGroup;
  private score: number = 0;
  private flapped: boolean = false;
  private distanceMoved: number = 0;

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
    this.load.image("end-pipe", "assets/happy_bird/end-pipe.png");
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, 512, 512, "background").setScale(2, 2);

    this.player = this.physics.add
      .sprite(256, 256, "bird")
      .setScale(2)
      .setCircle(6, 2, 2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.player.body.world.on("worldbounds", (...args) => {
      const down: boolean = args[2];
      if (down) {
        this.processGameOver();
      }
    });
    this.anims.create({
      key: "flap",
      frames: this.anims.generateFrameNumbers("bird", {
        frames: [0, 1, 2, 3, 0],
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.pipes = this.physics.add.staticGroup();
    this.createPipes();

    this.physics.add.collider(
      this.player,
      this.pipes,
      this.processGameOver,
      undefined,
      this,
    );

    this.input.on("pointerup", () => {
      this.flapped = false;
      this.tweens.add({
        targets: this.player,
        angle: 0,
        ease: "Linear",
        duration: 100,
      });
    });

    this.input.on("pointerdown", () => {
      if (!this.flapped) {
        this.player.anims.play("flap");
        this.tweens.add({
          targets: this.player,
          angle: -20,
          ease: "Linear",
          duration: 80,
        });
        this.player.setVelocityY(-250);
        this.flapped = true;
      }
    });

    this.events.once("shutdown", this.cleanup, this);
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.bg.setTilePosition(this.bg.tilePositionX + 0.1);

    this.pipes.incX(-1);
    this.pipes.children
      .getArray()
      .forEach((pipe: Phaser.Physics.Arcade.Sprite) => {
        if (pipe !== undefined) {
          pipe.refreshBody();
          if (pipe.x <= -16) {
            this.pipes.remove(pipe, true, true);
          }
        }
        return true;
      });

    this.distanceMoved += 1;
    if (this.distanceMoved % 256 === 0) {
      this.score += 1;
      EventBus.emit("update-score", this.score);
      this.createPipes();
    }
  }

  createPipes() {
    const bottomPipeHeight = Phaser.Math.Between(2, 25);
    const topPipeHeight = 25 - bottomPipeHeight + 2;
    for (let i = 0; i < bottomPipeHeight; ++i) {
      i === bottomPipeHeight - 1
        ? this.pipes.create(528, i * 16, "end-pipe")
        : this.pipes.create(528, i * 16, "middle-pipe");
    }
    for (let i = 0; i < topPipeHeight; ++i) {
      i === topPipeHeight - 1
        ? this.pipes.create(528, 512 - i * 16, "end-pipe")
        : this.pipes.create(528, 512 - i * 16, "middle-pipe");
    }
  }

  processGameOver() {
    this.player.setTint(0xff0000);
    this.game.pause();
    EventBus.emit("game-over");
  }

  changeScene() {
    EventBus.emit("change-scene", "MainMenu");
    this.scene.start("MainMenu");
  }

  cleanup() {
    this.input.off("pointerup");
    this.input.off("pointerdown");
    this.anims.remove("flap");
  }
}
