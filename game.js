/* global Phaser */

import { createAnimations } from "./animations.js"

const config = {
  type: Phaser.AUTO, // webgl, canvas
  width: 1280,
  height: 720,
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
    'assets/background_mountains.png'
  )

  this.load.image('platform', 'assets/tileset.png')

  this.load.spritesheet(
    'player1', // <--- id
    'assets/1/Walk.png',
    { frameWidth: 42, frameHeight: 29}
  )

  this.load.spritesheet(
    'player1-attacks',
    'assets/1/Attack1.png',
    { frameWidth: 42, frameHeight: 42}
  )

  this.load.spritesheet(
    'player2',
    'assets/2/Walk_2.png',
    { frameWidth: 42, frameHeight: 28}
  )

  this.load.spritesheet(
    'player2-attacks',
    'assets/2/Attack1.png',
    { frameWidth: 42, frameHeight: 42}
  )


} // 1.

let keyA;
let keyS;
let keyD;
let keyW;
let keyL;
let keyQ;

function create () {
  
  this.add.image(0, 0, 'background')
    .setOrigin(0, 0)
    .setScale(3.5)

  this.floor = this.physics.add.staticGroup()

  this.floor.create(20, 200, 'platform').setOrigin(0, 0).setScale(0.1).refreshBody()
  this.floor.create(200, 600, 'platform').setOrigin(0, 0).setScale(0.1).refreshBody()
  this.floor.create(550, 500, 'platform').setOrigin(0, 0).setScale(0.1).refreshBody()
  this.floor.create(500, 300, 'platform').setOrigin(0, 0).setScale(0.15).refreshBody()
  this.floor.create(800, 600, 'platform').setOrigin(0, 0).setScale(0.15).refreshBody()

  this.player1 = this.physics.add.sprite(50, 100, 'player1')
    .setOrigin(0, 0)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(1)
  

  this.player2 = this.physics.add.sprite(500, 100, 'player2')
    .setOrigin(0, 0)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(1)

  this.player2.flipX = true

  this.player1.setSize(29, 29).refreshBody()
  this.player2.setSize(29, 29).refreshBody()
  this.cameras.main.setBounds(0, 0, config.width, config.height);
  this.physics.add.collider(this.player1, this.player2, onPlayerContact, null, this)
  this.physics.add.collider(this.player1, this.floor)
  this.physics.add.collider(this.player2, this.floor)


  this.player1.setBounce(0.2);
  this.player2.setBounce(0.2);

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
  if (this.player2.isDead) return


  //Player 1 controls
  if (this.keys.left.isDown) {
    this.player1.anims.play('player1-walk', true)
    this.player1.setVelocityX(-200)
    this.player1.flipX = true
  } else if (this.keys.right.isDown) {
    this.player1.anims.play('player1-walk', true)
    this.player1.setVelocityX(200)
    this.player1.flipX = false
  } else {
    this.player1.setVelocityX(0)
    this.player1.anims.play('player1-idle', true)
  }

  if (this.keys.up.isDown && this.player1.body.touching.down) {
    this.player1.setVelocityY(-400)
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
    this.player2.setVelocityX(-200)
    this.player2.flipX = true
  } else if (keyD.isDown) {
    this.player2.anims.play('player2-walk', true)
    this.player2.setVelocityX(200)
    this.player2.flipX = false
  } else {
    this.player2.setVelocityX(0)
    this.player2.anims.play('player2-idle', true)
  }

  if (keyW.isDown && this.player2.body.touching.down) {
    this.player2.setVelocityY(-400)
    this.player2.anims.play('player2-jump', true)
  }

  if (keyS.isDown) {
    this.player2.setVelocityY(300)
    this.player2.anims.play('player2-jump', true)
  }
  if (keyQ.isDown) {
    this.player2.anims.play('player2-attack', true)
  }

  // Combat controls




  if (this.player1.y >= 600) {
    console.log('muerto')
    this.player1.isDead = true
    this.player1.anims.play('player1-iddle')
    this.player1.setCollideWorldBounds(false)

    setTimeout(() => {
      this.player1.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 2000)
  }

  if (this.player2.y >= 600) {
    console.log('muerto')
    this.player2.isDead = true
    this.player2.anims.play('player2-iddle')
    this.player2.setCollideWorldBounds(false)

    setTimeout(() => {
      this.player2.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 2000)
  }
}

function onPlayerContact(player1, player2) {

  if (keyL.isDown) {
  
    if (player1.x < player2.x) {
      // Player1 está a la izquierda, empujamos a Player2 hacia la derecha
      
      player2.x += 50; 
    } else {
      // Player1 está a la derecha, empujamos a Player2 hacia la izquierda
      
      player2.x -= 50; 
    }
  }

  if (keyQ.isDown) {
    
    if (player2.x < player1.x) {
      // Player2 está a la izquierda, empujamos a Player1 hacia la derecha
      
      player1.x += 50; 
    } else {
      // Player2 está a la derecha, empujamos a Player1 hacia la izquierda
      
      player1.x -= 50; 
    }
  }
}
