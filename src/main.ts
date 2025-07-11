import Phaser from 'phaser';
import { JumpScene } from './scenes/JumpScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { PopupScene } from './scenes/PopupScene';
import { GameConfig } from './config/GameConfig';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  ...GameConfig,
  scene: [ MainMenuScene, JumpScene, PopupScene ],
};

window.addEventListener('load', () => {
  new Phaser.Game(gameConfig);
});
