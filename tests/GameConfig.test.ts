import { describe, it, expect } from 'vitest';
import { GameConfig } from '../src/config/GameConfig';

describe('GameConfig', () => {
  it('has correct dimensions', () => {
    expect(GameConfig.width).toBe(800);
    expect(GameConfig.height).toBe(600);
  });

  it('uses arcade physics with gravity', () => {
    const physics: any = GameConfig.physics;
    expect(physics.default).toBe('arcade');
    expect(physics.arcade.gravity.y).toBe(300);
  });
});
