export const createAnimations = (game) => {
  game.anims.create({
    key: 'player1-walk',
    frames: game.anims.generateFrameNumbers(
      'player1',
      { start: 1, end: 5 }
    ),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'player1-idle',
    frames: [{ key: 'player1', frame: 0 }]
  })

  game.anims.create({
    key: 'player1-jump',
    frames: [{ key: 'player1', frame: 4  }]
  })

  game.anims.create({
    key: 'mario-dead',
    frames: [{ key: 'player1', frame: 4 }]
  })

  game.anims.create({
    key: 'player1-attack',
    frames: game.anims.generateFrameNumbers(
      'player1-attacks',
      { start: 0, end: 5}
    ),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'player2-walk',
    frames: game.anims.generateFrameNumbers(
      'player2',
      {start: 1, end: 5}
    ),
    frameRate: 12,
    repeat: -1
  })

  game.anims.create({
    key: 'player2-idle',
    frames: [{ key: 'player2', frame: 0}]
  })

  game.anims.create({
    key: 'player2-jump',
    frames: [{ key: 'player2', frame: 4}]
  })
}