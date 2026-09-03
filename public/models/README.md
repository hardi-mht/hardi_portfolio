# Character model

Drop a rigged full-body GLB here as `avatar.glb`.

Built for a **Ready Player Me** export: create a full-body avatar at
<https://readyplayer.me/avatar>, then download the `.glb` with
`?quality=medium&meshLod=1&textureAtlas=1024` appended to keep it near 2MB.

The rig needs Mixamo-style bone names (`Hips`, `Spine`, `LeftArm`,
`LeftForeArm`, `LeftUpLeg`, `LeftLeg`, `Head`, …). A `mixamorig:` prefix is
stripped automatically. No animation clips are required — the poses in
`src/components/three/poses.ts` are applied to the bones directly.

Until this file exists the scene falls back to the coded figure in
`src/components/three/Figure.tsx`, so nothing breaks.
