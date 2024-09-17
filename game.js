/* global Phaser */

import { createAnimations } from "./animations.js"

const config = {
  type: Phaser.AUTO, // webgl, canvas
  width: 1024,
  height: 476,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload, // se ejecuta para precargar recursos
    create, // se ejecuta cuando el juego comienza
    update // se ejecuta en cada frame
  }
}

new Phaser.Game(config)
// this -> game -> el juego que estamos construyendo

function preload () {
  this.load.image(
    'background',
    'assets/City1.png'
  )

  this.load.spritesheet(
    'player1', // <--- id
    'assets/1/Walk.png',
    { frameWidth: 42, frameHeight: 42 }
  )

  this.load.spritesheet(
    'player1-attacks',
    'assets/1/Attack2.png',
    { frameWidth: 42, frameHeight: 42}
  )

  this.load.spritesheet(
    'player2',
    'assets/2/Walk.png',
    { frameWidth: 42, frameHeight: 42}
  )

  // this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
} // 1.

let keyA;
let keyS;
let keyD;
let keyW;
let keyL;
let keyQ;

function create () {
  // image(x, y, id-del-asset)
  this.add.image(0, 0, 'background')
    .setOrigin(0, 0)
    .setScale(0.6)

  this.floor = this.physics.add.staticGroup()

  this.player1 = this.physics.add.sprite(50, 100, 'player1')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(1)

  this.player2 = this.physics.add.sprite(50, 100, 'player2')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(1)
  
  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.physics.add.collider(this.player1, this.floor)

  this.cameras.main.setBounds(0, 0, 2000, config.height)

  createAnimations(this)

  this.keys = this.input.keyboard.createCursorKeys()

  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
  keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
}

function update () { // 3. continuamente
  if (this.player1.isDead) return

  //Player 1 controls
  if (this.keys.left.isDown) {
    this.player1.anims.play('player1-walk', true)
    this.player1.x -= 2
    this.player1.flipX = true
  } else if (this.keys.right.isDown) {
    this.player1.anims.play('player1-walk', true)
    this.player1.x += 2
    this.player1.flipX = false
  } else {
    this.player1.anims.play('player1-idle', true)
  }

  if (this.keys.up.isDown) {
    this.player1.setVelocityY(-300)
    this.player1.anims.play('player1-jump', true)
  }

  if (this.keys.down.isDown) {
    this.player1.setVelocityY(300)
    this.player1.anims.play('player1-jump', true)
  }

  if (keyL.isDown) {
    this.player1.anims.play('player1-attack', true)
  }


  // Player 2 controls
  if (keyA.isDown) {
    this.player2.anims.play('player2-walk', true)
    this.player2.x -= 2
    this.player2.flipX = true
  } else if (keyD.isDown) {
    this.player2.anims.play('player2-walk', true)
    this.player2.x += 2
    this.player2.flipX = false
  } else {
    this.player2.anims.play('player2-idle', true)
  }

  if (keyW.isDown) {
    this.player2.setVelocityY(-300)
    this.player2.anims.play('player2-jump', true)
  }

  if (keyS.isDown) {
    this.player2.setVelocityY(300)
    this.player2.anims.play('player2-jump', true)
  }

  // if (this.player1.y >= config.height) {
  //   this.player1.isDead = true
  //   this.player1.anims.play('mario-dead')
  //   this.player1.setCollideWorldBounds(false)
    // this.sound.add('gameover', { volume: 0.2 }).play()

    //   setTimeout(() => {
    //     this.player1.setVelocityY(-350)
    //   }, 100)

    //   setTimeout(() => {
    //     this.scene.restart()
    //   }, 2000)
    // }
}