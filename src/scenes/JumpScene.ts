import Phaser from 'phaser';

export class JumpScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private trickKey!: Phaser.Input.Keyboard.Key;
  private combo = 0;
  private tricking = false;
  private comboTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'JumpScene' });
  }

  preload() {
    // generate a simple square texture to represent the skydiver
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1);
    g.fillRect(0, 0, 32, 32);
    g.generateTexture('skydiver', 32, 32);
    g.destroy();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.trickKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.player = this.physics.add.sprite(400, 100, 'skydiver');
    this.player.setName('player');
    this.player.setCollideWorldBounds(true);
  }

  private startTrick() {
    this.tricking = true;
    this.tweens.add({
      targets: this.player,
      angle: this.player.angle + 360,
      duration: 300,
      onComplete: () => {
        this.tricking = false;
        this.combo++;
        if (this.comboTimer) this.comboTimer.remove(false);
        this.comboTimer = this.time.addEvent({
          delay: 2000,
          callback: () => (this.combo = 0),
        });
        console.log(`Combo x${this.combo}`);
      },
    });
  }

  update() {
    if (!this.player) return;

    if (this.cursors.left?.isDown) this.player.setVelocityX(-200);
    else if (this.cursors.right?.isDown) this.player.setVelocityX(200);
    else this.player.setVelocityX(0);

    if (this.cursors.down?.isDown) this.player.setAccelerationY(400);
    else if (this.cursors.up?.isDown) this.player.setAccelerationY(-200);
    else this.player.setAccelerationY(0);

    if (Phaser.Input.Keyboard.JustDown(this.trickKey) && !this.tricking) {
      this.startTrick();
    }
  }
}
