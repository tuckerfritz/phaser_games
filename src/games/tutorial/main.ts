
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

function preload() {
  this.load.image("sky", "assets/tutorial/sky.png");
  this.load.image("ground", "assets/tutorial/platform.png");
  this.load.image("star", "assets/tutorial/star.png");
  this.load.image("bomb", "assets/tutorial/bomb.png");
  this.load.spritesheet("dude", "assets/tutorial/dude.png", {
    frameWidth: 32, frameHeight: 48
  });
}

let platforms: Phaser.Physics.Arcade.StaticGroup;
let stars: Phaser.Physics.Arcade.Group;
let bombs: Phaser.Physics.Arcade.Group;
let player: Phaser.Physics.Arcade.Sprite;
let score = 0;
let scoreText;
let gameOver = false;
function create() {
  this.add.image(400, 300, "sky");

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px", fill: "#000"
  });

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 548, "ground").setScale(2).refreshBody();

  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  player = this.physics.add.sprite(100, 450, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    framerate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    framerate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    framerate: 10,
    repeat: -1
  });

  this.physics.add.collider(player, platforms);

  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  })

  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  } as any);

  this.physics.add.collider(stars, platforms);

  function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        } as any);

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}
  this.physics.add.overlap(player, stars, collectStar, null, this);

  bombs = this.physics.add.group({ key: "bomb"});

  this.physics.add.collider(bombs, platforms);

  function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
  let cursors;
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;