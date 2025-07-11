import { describe, it, expect } from 'vitest';
import { gameConfig } from '../src/main';
import { JumpScene } from '../src/scenes/JumpScene';
import { MainMenuScene } from '../src/scenes/MainMenuScene';
import { PopupScene } from '../src/scenes/PopupScene';

describe('Game configuration', () => {
  it('includes all scenes in correct order', () => {
    expect(gameConfig.scene).toEqual([MainMenuScene, JumpScene, PopupScene]);
  });
});
