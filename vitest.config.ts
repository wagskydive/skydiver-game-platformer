import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    alias: {
      phaser: path.resolve(__dirname, 'tests/mocks/phaser.ts'),
    },
  },
});
