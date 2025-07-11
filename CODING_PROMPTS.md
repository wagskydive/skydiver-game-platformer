# CODING_PROMPTS.md

Skydiver Platformer — Step-by-Step Build Prompts  
Each task has an ID. Codex should automatically pick the first `[ ]` item, complete it, and check it off.

---

## ✅ SETUP & INIT

- [x] **ID: init-project**
      Set up a Phaser 3 + TypeScript + Vite project using `skydiver-boilerplate`. Include `main.ts`, `GameConfig.ts`, and `JumpScene`. (src/main.ts)

- [ ] **ID: load-test-sprite**  
      Load a test sprite and render it at the canvas center using Arcade physics. Add left/right movement.

- [ ] **ID: walk-animation**  
      Create a walk animation using `skydiver_walk.png`. Reference `player_animations.json`.

---

## 🟦 PLAYER CORE LOGIC

- [ ] **ID: player-jump**  
      Implement jump logic: skydiver freefall with drift, switch to canopy phase on SPACE.

- [ ] **ID: canopy-deploy**  
      Play `skydiver_canopy_open.png` animation when deploying chute. Reduce gravity and glide.

- [ ] **ID: landing-logic**  
      If vertical speed is low, play `skydiver_landing_soft.png`; otherwise play crash.

---

## 🟪 UI & SCORING

- [ ] **ID: hud-overlay**  
      Create UI HUD showing altitude, velocity, and combo score. Use placeholder HUD sprites.

- [ ] **ID: rings-scoring**  
      Spawn rings during freefall. Track ring collections and add to score.

- [ ] **ID: trick-system**  
      Press ‘Z’ midair to trigger trick animation with spin. Add score multiplier logic.

---

## 🟧 PARACHUTE PACKING MINIGAME

- [ ] **ID: pack-chute-minigame**  
      Show a 4-step minigame after landing using `skydiver_pack_chute.png`. Track success/fail.

---

## 🟨 HUB & PROGRESSION

- [ ] **ID: dropzone-hub**  
      Create top-down Dropzone hub scene with walkable paths and tile-based layout.

- [ ] **ID: interact-manifest**  
      Let player press ‘E’ near a building (e.g. manifest) to trigger menu.

- [ ] **ID: shop-ui**  
      Add shop UI: list helmets, suits, rigs, and canopies. Enable gear upgrades and stats display.

---

## 🟥 SCENE FLOW & SYSTEMS

- [ ] **ID: scene-transitions**  
      Set up scene transitions: Dropzone → Jump → Result → Dropzone.

- [ ] **ID: save-load-progress**  
      Save/load player progress (score, gear, skills) with localStorage.

---

## 🔷 POLISH & UTILITIES

- [ ] **ID: parallax-bg**  
      Add parallax scrolling layers: sky, clouds, mountain, city.

- [ ] **ID: auto-animation-loader**  
      Auto-load and register all animations from `player_animations.json`.

- [ ] **ID: debug-overlay**  
      Add an F3 debug overlay showing physics state and animation info.

---

Agents should check off tasks and reference the task ID in both comments and logs.
