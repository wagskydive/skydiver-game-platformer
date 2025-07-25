import Phaser from 'phaser';

export class JumpScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private landingZone!: Phaser.GameObjects.Rectangle;
  private landingText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private trickKey!: Phaser.Input.Keyboard.Key;
  private countdownText!: Phaser.GameObjects.Text;
  private controlsEnabled = false;
  private inCanopy = false;
  private landed = false;
  private targetX = 400;
  private score = 0;
  private combo = 0;
  private tricking = false;
  private comboTimer?: Phaser.Time.TimerEvent;

  private rings!: Phaser.Physics.Arcade.StaticGroup;
  private currents!: Phaser.Physics.Arcade.StaticGroup;

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

    // ring texture
    const ring = this.add.graphics();
    ring.lineStyle(2, 0xffff00);
    ring.strokeCircle(16, 16, 14);
    ring.generateTexture('ring', 32, 32);
    ring.destroy();

    // updraft texture
    const up = this.add.graphics();
    up.fillStyle(0x00ffff, 0.6);
    up.fillRect(0, 0, 60, 10);
    up.generateTexture('updraft', 60, 10);
    up.destroy();
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

    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      color: '#000',
      fontSize: '16px',
    });

    // rings to fly through
    this.rings = this.physics.add.staticGroup();
    for (let i = 1; i <= 3; i++) {
      const ring = this.rings.create(Phaser.Math.Between(100, 700), i * 150, 'ring');
      ring.setCircle(14, 1, 1);
    }

    // updraft currents
    this.currents = this.physics.add.staticGroup();
    const current = this.currents.create(Phaser.Math.Between(100, 700), 450, 'updraft');
    current.setSize(60, 10);

    this.physics.add.overlap(this.player, this.rings, this.collectRing, undefined, this);
    this.physics.add.overlap(this.player, this.currents, this.hitCurrent, undefined, this);

    this.startCountdown();
  }

  private startCountdown() {
    const { width, height } = this.scale;
    const sequence = ['3', '2', '1', 'Go!'];
    let index = 0;

    this.physics.world.pause();
    this.countdownText = this.add.text(width / 2, height / 2, sequence[index], {
      fontSize: '64px',
      color: '#000',
    }).setOrigin(0.5);
    index++;

    this.time.addEvent({
      delay: 1000,
      repeat: sequence.length - 1,
      callback: () => {
        if (index < sequence.length) {
          this.countdownText.setText(sequence[index]);
          index++;
        } else {
          this.countdownText.destroy();
        }
      },
      onComplete: () => {
        this.physics.world.resume();
        this.controlsEnabled = true;
      },
    });
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

  private collectRing(_player: Phaser.GameObjects.GameObject, ring: Phaser.GameObjects.GameObject) {
    ring.destroy();
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  private hitCurrent() {
    this.player.setVelocityY(-200);
  }

  update() {
    if (!this.player) return;
    if (!this.controlsEnabled) return;

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
      let message: string;
      if (dist < 20) {
        message = 'Bullseye! Bonus +50';
      } else if (dist < 50) {
        message = 'Nice Landing +20';
      } else {
        message = 'Hard Landing';
      }
      this.landingText.setText(message);
      this.scene.launch('PopupScene', {
        message: `${message}\nScore: ${this.score}\nClick to continue`,
      });
    }
  }
}
