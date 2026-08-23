# Asset Credits

3D assets were supplied with the project package under `03_3D_ASSETS/`. No
separate `licenses/` folder was included with the supplied package, so
licensing below is stated as accurately as the evidence allows: an explicit
bundled license file where one was present, otherwise an inference from the
asset's file-naming convention, clearly marked as such. **Verify licensing
independently before any commercial redistribution.**

## Used in the site

| Asset (as supplied) | Used as | License evidence | Where used |
|---|---|---|---|
| `Erlenmeyers.glb` | Multi-size Erlenmeyer flask set | No bundled license file. Included as a ready-made `.glb` in the supplied package. | Vendored in `assets/3d/erlenmeyers.glb`. Previously mounted in the hero scene; the hero now shows the apple model instead (see below), so this asset is not currently rendered anywhere on the page. |
| `bunsen_burner_2k.gltf.zip` → `assets/3d/bunsen_burner/` | Bunsen burner glassware set (diffuse/normal/ARM textures) | Filename pattern (`_2k`, `_diff`, `_nor_gl`, `_arm`) matches the Poly Haven asset-naming convention; Poly Haven publishes all assets under CC0 (public domain). No bundled license file to confirm directly — treat as CC0-pattern, verify against the original Poly Haven listing before reuse outside this project. | Vendored for potential laboratory-scene extension; downsampled to 1024px textures for web performance. |
| `wooden_table_02_2k.gltf.zip` → `assets/3d/wooden_table/` | Laboratory bench surface | Same Poly Haven naming pattern as above (inferred CC0). | Vendored for laboratory-scene extension; downsampled textures. |
| `stone_01_1k.gltf.zip` | Stone/ground material reference | Same Poly Haven naming pattern (inferred CC0). | Test-extracted and downsampled during development, then left out of the final package — no practical in the supplied manual calls for a stone/ground surface, so it was not retained per the content-scope lock. The original archive is unaffected and still available in the source uploads if a maintainer wants it for a future scene. |
| `food_apple_01_8k.gltf.zip` → `assets/3d/apple/` | Apple model, relevant to the manual's apple-juice titratable-acidity practical (3.1) | Filename pattern matches the Poly Haven asset-naming convention (inferred CC0). No bundled license file to confirm directly — verify against the original Poly Haven listing before reuse outside this project. | **Hero scene** (`#hero-stage`, top of page), rendered live with Three.js + `GLTFLoader` + `OrbitControls`, using its own baked color/normal/roughness textures (downsampled from 8k to 1024px for web performance). |
| `Bread Scan.glb` | Scanned bread/food sample | No bundled license file. Included as a ready-made `.glb` in the supplied package. | Staged as a generic "food sample" reference (relevant to the crude-protein/fat/starch/ash practicals, which all use a generic homogenized food sample per the manual). |
| `small_empty_room_2_2k.hdr` → `assets/hdri/lab_room.hdr` | Empty-room HDRI, for environment lighting/reflections | No bundled license file. Filename pattern is consistent with Poly Haven HDRI naming (inferred CC0). | Downsampled from 2048×1024 to 1024×512 (~6 MB → ~1.4 MB) for web performance; available for scene environment lighting. |

## Supplied but not integrated

| Asset | Reason not used |
|---|---|
| `Glass Beaker Cycles.zip` (`Beaker.blend` + `BLENDSWAP_LICENSE.txt`) | Supplied as a Blender `.blend` source file, not a browser-loadable format (glTF/GLB). Its bundled license is explicit and permissive — **Creative Commons Zero (Public Domain)**, "Glass Beaker (Cycles)" by donniecblender, via BlendSwap (blendswap.com/blends/view/68678), no attribution required. It was not converted to `.glb` in this build because no Blender/glTF-export toolchain was available in the build environment. A maintainer with Blender can export it to `.glb` and drop it into `assets/3d/` to add it to a scene. |
| `chemistry_set_4k.gltf.zip` | Supplied at 4k texture resolution (uncompressed textures ~10–13 MB each). Given the performance-budget requirement ("do not load every 3D asset at startup", "optimize aggressively"), this asset was left un-extracted rather than shipped at a size that would harm load performance; a maintainer can downsample its textures the same way `bunsen_burner`/`wooden_table`/`apple` were handled (see `assets/3d/` — each was resized to 1024px, quality 78, with ImageMagick) and mount it in a future scene. |
| `13pj3b1n.glb` (a burger model) and `fr0aqs2o.glb` (a baked bun model) | Inspected via glTF node/mesh names ("Burger", "Baked Bun"). Neither corresponds to any sample, apparatus or food type named in the supplied manual (soda, apple juice, generic homogenized food sample), so per the manual's content-scope lock they were **not** integrated into the laboratory scene — including them would have been decorative content unrelated to the manual's actual practicals. |

## Design reference

`02_DESIGN_REFERENCE/reference-design.png` — used strictly as visual-language
inspiration (warm off-white background, dark type, thin borders, acid-lime
accent, oversized editorial typography, numbered index cards). No brand names,
copy, layout structure or functionality from the reference site were copied;
see the Visual Identity section of the project brief for the resulting,
original design system.

## Manual document

`FOOD_CHEMISTRY_PRACTICAL_MANUAL_GUIDEBOOK/Practical Manual-Food Chemistry-AS6201.docx`
— the project's primary scientific source (see `scientific-sources.md` and
`manual-mapping.md`). Copyright remains with its original authors/institution
(Department of Applied Sciences, Mbeya University of Science and Technology);
it is included here for the sole purpose of building this educational
companion tool.
