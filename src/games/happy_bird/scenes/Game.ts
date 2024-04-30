import { EventBus } from "@/games/EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  private bg: Phaser.GameObjects.TileSprite;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private pipes: Phaser.Physics.Arcade.StaticGroup;
  private spacebar: Phaser.Input.Keyboard.Key;
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
    // Set the background for the game
    this.bg = this.add.tileSprite(0, 0, 512, 512, "background").setScale(2, 2);

    // Create the player sprite, collision, and animations
    this.player = this.physics.add.sprite(256, 256, "bird").setScale(2);
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
      key: "space",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 3 }),
      frameRate: 60,
      repeat: 0,
    });

    // Construct pipe container out of pipe sprites
    this.pipes = this.physics.add.staticGroup();
    this.createPipes();

    // Set collision between the player and the pipes
    this.physics.add.collider(this.player, this.pipes);
    this.physics.add.overlap(
      this.player,
      this.pipes,
      this.processGameOver,
      null,
      this,
    );

    // Create spacebar input
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  update() {
    // Scroll the background
    this.bg.setTilePosition(this.bg.tilePositionX + 0.1);

    // Scroll the pipes & destroy the ones that are off screen to the left
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

    // Keep track of how many pixels the player has moved
    this.distanceMoved += 1;
    if (this.distanceMoved % 256 === 0) {
      this.score += 1;
      EventBus.emit("update-score", this.score);
      this.createPipes(); // Create another obstacle very 50 pixels
    }

    // Process player inputs
    if (this.spacebar.isDown && this.flapped === false) {
      this.player.setVelocityY(-250);
      this.flapped = true;
    } else if (this.spacebar.isUp) {
      this.player.anims.play("space");
      this.flapped = false;
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
}
