# AI Delivery Loop Motion

AI Delivery Loop Motion is a 30-second, 9:16 Remotion explainer about moving from vague prompting to a repeatable delivery loop: clarify the need, decompose the work, produce a concrete output, and verify the result.

Every visual is generated with React, CSS, and inline SVG. The project has no footage, images, audio, remote fonts, tracking, or network API.

## Highlights

- Five six-second scenes with a continuous argument
- Deterministic frame-based animation using `interpolate()` and `spring()`
- Code-generated diagrams for ambiguity, packaging, delivery, verification, and iteration
- 1080 × 1920 vertical output at 30 fps
- High-contrast typography and a restrained cyan/amber system palette

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- A Chromium-compatible environment for rendering

## Install and preview

```bash
npm install
npm run dev
```

Open the Remotion Studio URL printed in the terminal and select `KnowledgeMotion`.

## Validate and render

```bash
npm run lint
npm run build
npm run render
```

The rendered MP4 is written to `out/ai-delivery-loop.mp4`. Generated media is intentionally ignored by Git.

## Project structure

```text
src/Composition.tsx  Scene data, motion timing, SVG diagrams, and captions
src/Root.tsx         Composition registration and 9:16 render settings
src/index.ts         Remotion entry point
src/index.css        Minimal global canvas reset
remotion.config.ts   Image format and overwrite behavior
```

## Known limitations

- The narration is represented as on-screen Chinese captions; no voiceover or soundtrack is included.
- The default font stack prefers Microsoft YaHei and falls back to a generic sans-serif font, so line wrapping can differ across operating systems.
- Scene copy is embedded in `Composition.tsx`; there is no external configuration or localization layer.
- The repository is a focused composition, not a general-purpose video-template engine.

## Provenance

The original Codex-assisted composition was created on 2026-06-11. This repository is a clean publication copy containing only the completed composition and its minimal build configuration. Generic starter documentation, remote logo assets, unused Tailwind integration, generated media, and the original Git history were excluded.

The original project marked itself `UNLICENSED`; that marker is preserved. No open-source license has been added.
