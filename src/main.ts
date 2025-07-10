import Phaser from 'phaser';
import { JumpScene } from './scenes/JumpScene';
import { GameConfig } from './config/GameConfig';

const config: Phaser.Types.Core.GameConfig = {
  ...GameConfig,
  scene: [ JumpScene ],
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});