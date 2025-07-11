import { describe, it, expect } from 'vitest';
import { JumpScene } from '../src/scenes/JumpScene';
import { MainMenuScene } from '../src/scenes/MainMenuScene';
import { PopupScene } from '../src/scenes/PopupScene';

describe('Scene exports', () => {
  it('JumpScene is a class', () => {
    expect(typeof JumpScene).toBe('function');
  });

  it('MainMenuScene is a class', () => {
    expect(typeof MainMenuScene).toBe('function');
  });

  it('PopupScene is a class', () => {
    expect(typeof PopupScene).toBe('function');
  });
});
