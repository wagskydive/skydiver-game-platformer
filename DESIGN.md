# Skydiver Platformer — Design Guide

## 1. High-Level Vision
**Goal:** A whimsical 2D pixel-art platformer where players control a skydiver performing freefall stunts and canopy maneuvers, then packing their chute—earning points to upgrade gear and skills.

- **Tone & Style:** Light-hearted, cartoonish. Emphasize humor in animations (ragdoll crashes), quirky NPC dialogue, and playful sound effects.
- **Primary Audience:** Casual and mid-core players who enjoy quick, replayable jump scenarios and gear progression.

---

## 2. Core Gameplay Mechanics

### 2.1 Freefall Phase
- **Movement Controls:**  
  - **Left/Right** arrow or A/D to steer horizontally.  
  - **Down** arrow to dive (increase fall speed).  
  - **Up** arrow to flare slightly (reduce descent).  
- **Tricks & Combos:**  
  - Tap a “Trick” key (e.g., X) midair to perform flips/rolls.  
  - String tricks before landing to build combo multipliers.  
- **Environmental Interactions:**  
  - **Rings & Gates:** Fly through to score points/time bonus.  
  - **Air Currents:** Yellow updrafts give altitude boost.

### 2.2 Canopy Phase
- **Glide Mechanics:**  
  - Steering controls remain.  
  - **Flare (Spacebar):** Slow descent/pull canopy.  
  - **Dive:** Push joystick or Down key for burst speed.  
- **Precision Landing:**  
  - Touchdown on a target zone bullseye for bonus score.  
  - Hard landings outside zone yield point penalties.

### 2.3 Parachute Packing Minigame
- **Objective:** Complete a quick “pack sequence” before next jump.  
- **Mechanics:** Display a pattern (button sequence or timing bar). Successful completion yields no penalties; failure reduces next jump’s starting score.

---

## 3. Progression & Upgrade Systems

### 3.1 Points & Currency
- Points earned per jump (freefall + canopy + landing).  
- Convert points to “Dropzone Bucks” in hub.

### 3.2 Gear Shop
- **Helmets:** Reduce damage (stricter landing bonus).  
- **Suits:** Improve trick window and drag coefficient.  
- **Rigs:** Decrease packing minigame difficulty/time.  
- **Canopies:** Tighter turn radius, faster dive speeds.

### 3.3 Skill Tree
- Passive bonuses (unlocked with skill points):  
  - +5% freefall speed  
  - +10% trick multiplier  
  - +5% canopy responsiveness  

---

## 4. Hub & World Structure

### 4.1 Dropzone Hub (Top-Down View)
- **NPCs & Manifest:** Register for jumps, receive daily challenges.  
- **Shops:** Gear, cosmetics, and skill trainers.  
- **Leaderboards:** High-score boards for each jump site.

### 4.2 Jump Sites (Levels)
- **Airplane Jumps:** Static or moving platforms.  
- **BASE Jumps (Late Game):** Cliff faces, rooftops, dynamic obstacles (e.g., wind gusts, drones).

---

## 5. Art & Audio Direction
- **Resolution & Style:** 32×32 sprites, 12-color palette.  
- **Animation:** Exaggerated frames—squash/stretch for comical effect.  
- **Sound:** Chiptune soundtrack; playful SFX (boings, whoomps, zip-flaps).

---

## 6. Technical Architecture

### 6.1 Engine & Framework
- **Phaser 3** with TypeScript + Vite for fast iteration.  
- **Physics:** Arcade physics for freefall + simple lift/drag for canopy.

### 6.2 File & Code Structure
```
my-skydiver/
├── assets/
│   ├── sprites/    # PNGs & sprite sheets
│   └── audio/      # WAV/OGG files
├── public/
│   └── index.html
├── src/
│   ├── scenes/     # Phaser scenes (Jump, Hub, Shop)
│   ├── config/     # Global config & constants
│   └── main.ts     # Bootstrap
├── DESIGN.md       # This design guide
├── tsconfig.json
├── package.json
└── vite.config.ts
```

### 6.3 Asset Pipeline & Naming Conventions
- **Sprites:** `hero_idle.png`, `hero_fall.png`, `ring_gate.png`.  
- **Audio:** `sfx_pack_start.wav`, `music_loop_chiptune.ogg`.

---

## 7. Next Steps
1. **Push boilerplate** to GitHub.  
2. **Initialize GitHub Actions** for linting & build checks.  
3. **Implement core freefall controls** and basic UI overlay.  
4. **Integrate design document** with Codex for auto-generating stub methods and docs.

---

*End of Design Guide*