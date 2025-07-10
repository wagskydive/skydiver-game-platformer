import Phaser from 'phaser';

export class JumpScene extends Phaser.Scene {
  constructor() {
    super({ key: 'JumpScene' });
  }

  preload() {
    // e.g. this.load.image('skydiver', 'assets/sprites/skydiver.png');
  }

  create() {
    const player = this.physics.add.sprite(400, 100, 'skydiver');
    player.setCollideWorldBounds(true);

    this.input.keyboard.on('keydown-SPACE', () => {
      this.physics.world.gravity.y = 0;
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const player = this.children.getByName('player') as Phaser.Physics.Arcade.Sprite;
    if (!player) return;

    if (cursors.left.isDown)  player.setVelocityX(-200);
    else if (cursors.right.isDown) player.setVelocityX(200);
    else player.setVelocityX(0);
  }
}