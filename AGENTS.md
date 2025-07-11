# Development Guide for OpenAI Codex

This file provides detailed instructions for contributors and AI agents working with the **Skydiver Platformer** project. Use it as the main reference for coding standards, file organization, and development workflow.

## Repository Overview

```
/ (root)
├── public/           # Static assets served by Vite
│   └── index.html    # HTML entry point
├── src/              # TypeScript game source code
│   ├── scenes/       # Phaser scenes (MainMenuScene, JumpScene, PopupScene)
│   ├── config/       # Shared configuration and constants
│   └── main.ts       # Game bootstrap
├── DESIGN.md         # Game design document
├── AGENTS.md         # This guide
├── package.json      # npm scripts and dependencies
└── vite.config.ts    # Vite build configuration
```

All gameplay logic should reside in `src/`. Static assets such as images and audio will eventually be placed under an `assets/` directory as outlined in `DESIGN.md`.

## Coding Conventions

- **Language:** Use **TypeScript** for all source files.
- **Engine:** Phaser 3. Scenes should extend `Phaser.Scene`.
- **Style:** Follow the existing formatting in the repository. Use semicolons and camelCase variable names.
- **Scene Files:** Place each scene in `src/scenes/` and name using `PascalCaseScene.ts` (e.g., `JumpScene.ts`).
- **Game Config:** Shared configuration lives in `src/config/`. Export settings as plain objects.
- **Sprites & Audio:** When adding assets, follow the naming convention from `DESIGN.md`, e.g. `hero_idle.png`, `music_loop_chiptune.ogg`.
- **Comments:** Add comments for complex logic or calculations, especially physics and timing code.

## Design Guidelines from `DESIGN.md`

When implementing new features, ensure they align with the design document:

1. **Freefall Phase**
   - Support horizontal steering (Left/Right or A/D), diving (Down), and flaring (Up).
   - Include trick mechanics (`X` key) with combo multipliers.
   - Rings and air currents should provide score or boosts.
2. **Canopy Phase**
   - Continue using steering keys, with Space/Up for flaring and Down for quick dives.
   - Implement precision landing on a target zone.
3. **Parachute Packing Minigame** (planned)
   - Display a button/timing sequence. Failure should affect the next jump's starting score.
4. **Progression Systems** (planned)
   - Points convert to in-game currency for gear upgrades (helmets, suits, rigs, canopies) and skill tree bonuses.
5. **Hub World** (planned)
   - Top-down dropzone with NPCs, shops, and leaderboards.
6. **Art Style**
   - Use 32×32 pixel sprites and a limited color palette. Animations should be exaggerated and humorous.

Keep future additions modular to allow easy expansion of scenes and mechanics.

## Build and Testing

There are currently no automated tests. Before committing code, run the build to ensure TypeScript compiles:

```bash
npm run build
```

## Pull Request Requirements

- Describe the feature or fix in detail.
- Reference sections of `DESIGN.md` that your changes implement or modify.
- Ensure `npm run build` completes without errors.
- Keep PRs focused on one feature or bugfix.


