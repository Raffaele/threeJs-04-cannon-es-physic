# 04 — Cannon-es Physics

Learning project: adding physics to a Three.js scene using
[cannon-es](https://github.com/pmndrs/cannon-es), a maintained fork of
cannon.js.

Three.js handles rendering only; it has no built-in physics. cannon-es runs a
separate simulation (its own bodies, shapes, gravity, collisions) and, each
frame, its results are copied onto the Three.js meshes.

## Stack

- **TypeScript**
- **Three.js** — scene, camera, renderer, meshes
- **cannon-es** — rigid body physics
- **Parcel** — bundler / dev server
- No UI framework

## Project: "Drop Zone"

A static ground plane with boxes and spheres spawned on top of it (on an
interval and/or on click) that fall under gravity, collide with the ground
and with each other, and settle with some friction/bounciness.

This scope is deliberately minimal, to cover the core cannon-es building
blocks before moving on to anything more advanced:

- `CANNON.World` setup and `world.step()` (fixed timestep)
- `CANNON.Body` creation with simple shapes (`Box`, `Sphere`, `Plane`)
- Gravity and body-to-ground / body-to-body collisions
- `CANNON.Material` / `ContactMaterial` for friction and restitution
- Syncing each physics body (`body.position`, `body.quaternion`) to its
  corresponding Three.js mesh every frame

**Not** in scope for this first pass (left as future steps): constraints/
joints, raycast-based dragging, concave/trimesh shapes.

## Getting started

```bash
yarn install
yarn start
```

Then open the dev server URL printed in the terminal.

## Scripts

| Command        | Description                                  |
| -------------- | --------------------------------------------- |
| `yarn start`   | Start Parcel dev server with live reload       |
| `yarn build`   | Production build to `dist/`                    |
| `yarn deploy`  | Build and publish `dist/` to GitHub Pages       |

## Project structure

```
src/
  index.html   # entry HTML, mounts the canvas
  ts/
    index.ts   # scene, camera, renderer, cannon-es world, animation loop
```

## Status

🚧 In progress — `src/ts/index.ts` is currently empty; the scene, world, and
render loop are being built up incrementally.
