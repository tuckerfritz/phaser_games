import { EventBus } from "@/games/EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private stars: Phaser.Physics.Arcade.Group;
  private bombs: Phaser.Physics.Arcade.Group;
  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private score: number = 0;
  private gameOver: boolean = false;
  private scoreText: Phaser.GameObjects.Text;
  private leftDown: boolean = false;
  private rightDown: boolean = false;
  private jumpDown: boolean = false;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("sky", "assets/tutorial/sky.png");
    this.load.image("ground", "assets/tutorial/platform.png");
    this.load.image("star", "assets/tutorial/star.png");
    this.load.image("bomb", "assets/tutorial/bomb.png");
    this.load.spritesheet("dude", "assets/tutorial/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this,
    );

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this,
    );

    // listen for touch input events
    EventBus.on("LEFT", (pressedOrReleased: "pressed" | "released") => {
      if (pressedOrReleased === "released") {
        this.leftDown = false;
      } else {
        this.leftDown = true;
      }
    });
    EventBus.on("RIGHT", (pressedOrReleased: "pressed" | "released") => {
      if (pressedOrReleased === "released") {
        this.rightDown = false;
      } else {
        this.rightDown = true;
      }
    });
    EventBus.on("JUMP", (pressedOrReleased: "pressed" | "released") => {
      if (pressedOrReleased === "released") {
        this.jumpDown = false;
      } else {
        this.jumpDown = true;
      }
    });
  }

  update() {
    if (this.gameOver) {
      EventBus.emit("game-over");
      return;
    }

    if (this.cursors.left.isDown || this.leftDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown || this.rightDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (
      this.cursors.up.isDown ||
      (this.jumpDown && this.player.body.touching.down)
    ) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate(function (
        child: Phaser.Physics.Arcade.Sprite,
      ) {
        child.enableBody(true, child.x, 0, true, true);
        return true;
      });

      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  hitBomb(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.gameOver = true;
  }
}
