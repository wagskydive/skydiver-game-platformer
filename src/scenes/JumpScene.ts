import Phaser from 'phaser';

export class JumpScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private landingZone!: Phaser.GameObjects.Rectangle;
  private landingText!: Phaser.GameObjects.Text;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private trickKey!: Phaser.Input.Keyboard.Key;
  private inCanopy = false;
  private landed = false;
  private targetX = 400;
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

    // simple canopy texture
    const canopy = this.add.graphics();
    canopy.fillStyle(0xff0000, 1);
    canopy.fillRect(0, 0, 40, 20);
    canopy.generateTexture('canopy', 40, 20);
    canopy.destroy();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.trickKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.player = this.physics.add.sprite(400, 100, 'skydiver');
    this.player.setName('player');
    this.player.setCollideWorldBounds(true);

    // landing target visualization
    this.landingZone = this.add.rectangle(this.targetX, 580, 100, 40, 0x007700);
    this.landingZone.setOrigin(0.5, 1);

    this.landingText = this.add.text(400, 20, '', { color: '#000', fontSize: '16px' }).setOrigin(0.5, 0);
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

    // transition to canopy phase automatically after a certain height
    if (!this.inCanopy && this.player.y > 300) {
      this.inCanopy = true;
      this.player.setTexture('canopy');
    }

    if (this.inCanopy) {
      // horizontal glide
      if (this.cursors.left?.isDown) this.player.setVelocityX(-150);
      else if (this.cursors.right?.isDown) this.player.setVelocityX(150);
      else this.player.setVelocityX(0);

      // flare and dive controls
      if (this.cursors.down?.isDown) {
        this.player.setVelocityY(300); // dive
      } else if (this.cursors.space?.isDown || this.cursors.up?.isDown) {
        this.player.setVelocityY(50); // flare
      } else {
        this.player.setVelocityY(100); // normal glide
      }
    } else {
      // freefall controls
      if (this.cursors.left?.isDown) this.player.setVelocityX(-200);
      else if (this.cursors.right?.isDown) this.player.setVelocityX(200);
      else this.player.setVelocityX(0);

      if (this.cursors.down?.isDown) this.player.setAccelerationY(400);
      else if (this.cursors.up?.isDown) this.player.setAccelerationY(-200);
      else this.player.setAccelerationY(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.trickKey) && !this.tricking) {
      this.startTrick();
    }

    // check landing
    if (this.inCanopy && !this.landed && this.player.body.blocked.down) {
      this.landed = true;
      const dist = Math.abs(this.player.x - this.targetX);
      if (dist < 20) {
        this.landingText.setText('Bullseye! Bonus +50');
      } else if (dist < 50) {
        this.landingText.setText('Nice Landing +20');
      } else {
        this.landingText.setText('Hard Landing');
      }
    }
  }
}
