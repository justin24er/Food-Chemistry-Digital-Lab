/* ============================================================
   WEBGL — HERO LABORATORY SCENE
   Loads the supplied Erlenmeyer flask set (and, on larger
   screens, the bunsen burner + table) with OrbitControls.
   Falls back to a static technical-diagram SVG when WebGL is
   unavailable, so the practical is never left blank.
   ============================================================ */

export function supportsWebGL(){
  try{
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  }catch(e){ return false; }
}

export async function mountHeroScene(container){
  if (!supportsWebGL()){ renderFallback(container); return; }

  const loadingEl = document.createElement("div");
  loadingEl.className = "scene-loading";
  loadingEl.innerHTML = `<span class="loading-ring"></span><span>Loading food sample\u2026</span>`;
  container.appendChild(loadingEl);

  try{
    const THREE = await import("./vendor/three/three.module.min.js");
    const { GLTFLoader } = await import("./vendor/three/examples/jsm/loaders/GLTFLoader.js");
    const { OrbitControls } = await import("./vendor/three/examples/jsm/controls/OrbitControls.js");

    const width = container.clientWidth, height = container.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width/height, 0.1, 100);
    camera.position.set(2.0, 1.4, 3.0);

    const hemi = new THREE.HemisphereLight(0xF3F1EB, 0x2a2a1f, 1.0);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff4de, 1.9);
    key.position.set(3,5,2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xD9F500, 0.55);
    rim.position.set(-3,2,-2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-2,1,3);
    scene.add(fill);

    const loader = new GLTFLoader();
    const group = new THREE.Group();
    scene.add(group);

    const gltf = await loader.loadAsync("assets/3d/apple/apple.gltf");
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3(); box.getSize(size);
    const center = new THREE.Vector3(); box.getCenter(center);
    const scale = 2.1 / Math.max(size.x, size.y, size.z);
    model.scale.setScalar(scale);
    model.position.sub(center.multiplyScalar(scale));
    group.add(model);

    loadingEl.remove();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI/3.2;
    controls.maxPolarAngle = Math.PI/1.8;

    let raf;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotate = !prefersReduced;

    function animate(){
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){ if(!raf) animate(); }
        else { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.05 });
    io.observe(container);

    window.addEventListener("resize", ()=>{
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w/h; camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    });
  }catch(err){
    console.warn("Hero 3D scene failed to load, using fallback.", err);
    loadingEl.remove();
    renderFallback(container);
  }
}

function renderFallback(container){
  container.innerHTML = `
  <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <rect width="300" height="240" fill="var(--surface)"/>
    <g fill="none" stroke="var(--ink)" stroke-width="2">
      <path d="M150,70 C120,70 100,95 100,130 C100,165 122,190 150,190 C178,190 200,165 200,130 C200,95 180,70 150,70 Z"/>
      <path d="M150,70 C150,55 158,45 168,40" stroke-linecap="round"/>
      <path d="M150,55 C160,45 172,44 178,50" stroke="var(--lime)" stroke-width="3" stroke-linecap="round"/>
    </g>
  </svg>`;
}
