# Project context

This project (`04-cannon-es-physics`) is an environment for **learning Three.js in TypeScript**.
Stack: TypeScript, Three.js, cannon-es, Parcel (bundler/dev server), no UI framework.

Goal of this project: build a simple physic system with gravity and different types of interactions. The physic should be handled by cannon-es and the render with threeJs.

### Chosen project: "Drop Zone"

A scene with a static ground plane (`CANNON.Plane` + `THREE.PlaneGeometry`) onto
which boxes and spheres (`CANNON.Box`/`CANNON.Sphere`) are spawned repeatedly
(on an interval and/or on mouse click) and fall under gravity. A
`ContactMaterial` controls friction/restitution (bounciness) between bodies
and the ground. This is intentionally scoped to the simplest cannon-es
building blocks — no constraints/joints, no concave meshes — to keep the
first pass focused on: `World` setup, `Body` creation, gravity, body↔ground
collisions, and syncing `body.position`/`body.quaternion` to the
corresponding Three.js mesh each frame. Constraints, raycast-based
interaction (grabbing/dragging objects), and more complex shapes are natural
next steps once this is solid.

## User profile

- **Experienced** front-end developer.
- Strong knowledge of HTML, CSS, JavaScript, TypeScript.
- Strong math foundations (linear algebra, trigonometry, geometry) — no need
  to explain concepts like vectors, matrices, transformations, quaternions,
  etc. from scratch, but it's useful to explicitly connect them to how
  Three.js/cannon-es use them (e.g. Vector3 vs. CANNON.Vec3, Euler/Quaternion
  for rotations).
- Already knows the **basics of Three.js** (scene graph, camera, renderer,
  geometries, materials, lights, animation loop, controls): no need to
  re-explain these from scratch.
- **New to cannon-es**: this is the main learning goal of the project. Focus
  explanations and guidance here.

## How to collaborate

- Don't explain basic JS/TS/CSS/HTML concepts: assume mastery of these.
- Don't re-explain Three.js fundamentals already known (scene, camera,
  renderer, geometries/materials, animation loop, controls) unless directly
  relevant to a cannon-es interaction being discussed.
- Focus on **cannon-es-specific APIs and concepts**: World, Body, Shape
  (Box/Sphere/Plane/ConvexPolyhedron/Trimesh...), Material/ContactMaterial,
  Constraints (PointToPoint, Hinge, Lock, Distance...), collision events
  (`collide`, `collideBegin`/`collideEnd`), Broadphase/Solver tuning, sleep
  states, and how these map onto the Three.js render loop (syncing
  `body.position`/`body.quaternion` to `mesh.position`/`mesh.quaternion`,
  fixed vs. variable timestep with `world.step()`).
- Explain the "why" behind cannon-es's typical choices (e.g. why a fixed
  timestep is used for `world.step()`, why shapes are often simpler than
  render geometry, how contact materials resolve friction/restitution)
  rather than basic language syntax.
- When useful, connect cannon-es concepts to the underlying math (e.g. how
  impulses/forces update velocity, how quaternions represent rigid body
  orientation, broadphase collision detection).
- Prefer practical, incremental examples in the existing code (`src/index.ts`)
  over purely theoretical explanations.
- **Do not modify code files (`.html`, `.ts`, etc.) on behalf of the user.**
  The goal is for the user to write the code themselves in order to learn
  cannon-es: guide them with explanations, pointers on which APIs/properties
  to use, illustrative code snippets (without applying them directly to the
  files), and feedback on the code they write.
