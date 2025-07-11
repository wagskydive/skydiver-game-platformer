import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 50, 'Skydiver Platformer', {
      fontSize: '32px',
      color: '#000',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 10, 'Press Space or Click to Start', {
      fontSize: '16px',
      color: '#000',
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('JumpScene');
    });

    this.input.once('pointerdown', () => {
      this.scene.start('JumpScene');
    });
  }
}
