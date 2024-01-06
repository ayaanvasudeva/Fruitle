let score = 0
let birth = 0
function preload() {
  this.load.image("player", "assets/player.png");
  this.load.image("coin", "assets/enemy.png");
  this.load.image("shop", "assets/earn.png");
}

function create() {
  
  this.scoreText = this.add.text(0, 0, "Money: 0", {
                                  fill:"white",
                                  fontSize:"20px",
                                  fontFamily:"Arial Black",
                          
                                }).setScrollFactor(0).setDepth(200);
  this.position = this.add.text(0, 20, "Position", {
    fill:"white",
    fontSize:"20px",
    fontFamily:"Arial Black",

  }).setScrollFactor(0).setDepth(200);
  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  this.player = this.physics.add
    .image(config.width / 2, config.height / 2, "player")
    .setScale(0.175, 0.175);
   this.player.setCollideWorldBounds(true);
  this.coin = this.physics.add
  .image(config.width / 1.04, config.height / 1.07, "coin")
  .setScale(0.25, 0.25);

 

  
}


function update() {
  score+=1
  birth+=1
  this.physics.add.overlap(this.player, this.coin, this.collectCoin);
  this.collectCoin = (player, coin)=>{
    coin.destroy();
    this.endTEXT = this.add.text(200, 200, "GAMEOVER!", {
      fill:"white",
      fontSize:"100px",
      fontFamily:"Arial Black",

    }).setScrollFactor(0).setDepth(200);
    this.physics.pause();
    setTimeout(()=>location.reload(), 1000);
    
  };
  if (birth > 499){
    birth = 0
    this.coin = this.physics.add
    .image(config.width / 1.04, config.height / 1.07, "coin")
    .setScale(0.25, 0.25);
  }
  
  this.scoreText.setText("Time: "+ score);
  if (this.coin.x > this.player.x){
    this.coin.x -= 2.5
  }else{
    this.coin.x += 2.5
  }
  if (this.coin.y > this.player.y){
    this.coin.y -= 2.5
  }else{
    this.coin.y += 2.5
  }
  let cursors = this.input.keyboard.createCursorKeys();
  if (
    cursors.left.isDown ||
    this.a.isDown ||
    cursors.right.isDown ||
    this.d.isDown
  )

    this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -400 : 400);
  else this.player.setVelocityX(0);
  if (
    cursors.up.isDown ||
    this.w.isDown ||
    cursors.down.isDown ||
    this.s.isDown
  )
    this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -400 : 400);
  else this.player.setVelocityY(0);
}

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  backgroundColor: "#ADD8E6",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
