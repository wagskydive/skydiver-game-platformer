import Phaser from 'phaser';

export class PopupScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PopupScene' });
  }

  create(data: { message: string }) {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width * 0.7, height * 0.3, 0x000000, 0.7);
    this.add.text(width / 2, height / 2, data.message, {
      fontSize: '20px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);

    const close = () => {
      this.scene.stop();
      this.scene.start('MainMenuScene');
    };

    this.input.once('pointerdown', close);
    this.input.keyboard.once('keydown-SPACE', close);
  }
}
