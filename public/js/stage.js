/* ============================================================================
   My Vision of India: The Short Edition
   A scroll-driven stage. The book stands where a statue would; the camera flies
   one full orbit around it as the page scrolls, forge-like sparks rise, and a
   slow wave shader breathes behind, turning from the cover's maroon to its teal.
   ============================================================================ */

// ---- Assets ----------------------------------------------------------------
const MODEL_URL = '';   // optional: a .glb of the book. When set, it replaces the built-in one.
const IMAGES = '/images/';   // the WebP files in public/images

// The cover lettering is drawn on a canvas, so it needs the real family name that next/font gave Cinzel.
const CINZEL = getComputedStyle(document.documentElement).getPropertyValue('--ff-cinzel').trim() || '"Cinzel"';

// ---- Three.js (served from public/vendor/three, version 0.160.0) -------------
let THREE = null, GLTFLoader = null;
try {
    THREE = await import('/vendor/three/three.module.js');
    if (MODEL_URL) ({ GLTFLoader } = await import('/vendor/three/loaders/GLTFLoader.js'));
} catch (error) {
    console.warn('Three.js could not be loaded; showing the page without the 3D stage.', error);
}

// ---- Globals -----------------------------------------------------------------
const canvas = document.querySelector('#webgl');
let scene, camera, renderer;
let gltfModel;     // the book
let modelPivot;    // pivot group for perfect center-rotation
let mixer;
let viewLight;    // follows the camera so front and back covers are lit alike
let clock = null;
let currentScroll = 0;   // smoothed accumulated scroll for lerping

let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;


let bgMaterial;
let fabricLoaded = false;
let bookScreen = null;   // where the book sits on screen, for the fabric's light pool
let shaderUniforms = null;

let sparkParticles;
const sparkCount = 110;
const sparkData = [];

const sizes = { width: window.innerWidth, height: window.innerHeight };

// The 3D story plays while the stage track scrolls by; the chapters then rise over it.
// story: scroll distance from slide 1 to slide 4. chaptersTop: where the chapters fill the screen.
const stageTrack = document.querySelector('.stage-track');
const chaptersEl = document.querySelector('.chapters');
const layout = { story: 1, chaptersTop: 1 };
function measure() {
    layout.story = Math.max(1, stageTrack.offsetHeight - window.innerHeight);
    layout.chaptersTop = chaptersEl.offsetTop;
}
measure();

// Gold foil carries the statue's material: semi-matte, with a high satin metallic sheen.
const FOIL_ROUGHNESS = 0.42;
const FOIL_METALNESS = 0.92;
const CLOTH_ROUGHNESS = 0.86;
const CLOTH_SHEEN = 0.22;

// A statue's largest dimension is its length; a book's is its height, so it stands a little
// smaller and a little higher than the statue would, to sit whole inside the first frame.
const MODEL_MAX_DIM = 3.0;
const PIVOT_Y = -0.2;

let fadeMaterials = [];
let fadeProgress = 1;

// ============================================================================
// Scene
// ============================================================================
function initScene() {
    clock = new THREE.Clock();
    shaderUniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 }
    };

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.FogExp2('#000000', 0.01);

    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0.2, 3.0);
    scene.add(camera);

    createBackgroundShader();   // adds the wave plane as a child of the camera

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.2;

    createLighting();
    createEnvironment();
    createSparks();
    loadModel();
}

// ---- Dramatic lighting (chiaroscuro) -----------------------------------------
function createLighting() {
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.1);
    scene.add(ambientLight);

    // Key light: super-bright white from upper-right, casts shadows
    const keyLight = new THREE.SpotLight('#fff0d8', 18.0);
    keyLight.position.set(4, 6, 3);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.9;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Rim light: cool from behind-left, defines the silhouette. Kept low: printed cloth
    // scatters it, and at full strength it turned the back cover plum while the front stayed maroon.
    const rimLight = new THREE.DirectionalLight('#d4ece6', 0.9);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Fill light: very faint warm cream from below-front
    const fillLight = new THREE.DirectionalLight('#fff3e6', 0.8);
    fillLight.position.set(-2, -4, 2);
    scene.add(fillLight);

    // View light: a soft neutral light from just above the camera, moved with it in animate(),
    // so whichever cover faces the viewer shows the same printed maroon.
    viewLight = new THREE.DirectionalLight('#fff6ec', 1.6);
    scene.add(viewLight, viewLight.target);
}

// ---- A dark studio for the foil to reflect ------------------------------------
// A statue catches the three lights on its curves. A flat foil-stamped cover needs
// something broad to mirror, so the gold gets a dim painted room: black, with one
// warm soft-box overhead and one cool strip behind, matching the key and rim lights.
function createEnvironment() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#050302';
    ctx.fillRect(0, 0, 512, 256);
    const glow = (x, y, rx, ry, color) => {
        ctx.save();
        ctx.translate(x, y); ctx.scale(rx, ry);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
        g.addColorStop(0, color); g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(-1, -1, 2, 2);
        ctx.restore();
    };
    glow(330, 40, 190, 70, 'rgba(255, 226, 170, 0.95)');   // warm soft-box, upper right
    glow(256, 128, 256, 46, 'rgba(120, 78, 36, 0.55)');    // a low amber horizon all round
    glow(70, 96, 60, 90, 'rgba(170, 215, 255, 0.6)');      // cool strip behind-left
    const equirect = new THREE.CanvasTexture(c);
    equirect.mapping = THREE.EquirectangularReflectionMapping;
    equirect.colorSpace = THREE.SRGBColorSpace;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromEquirectangular(equirect).texture;
    equirect.dispose();
    pmrem.dispose();
}

// ---- Gold dust around the book (110 additive point particles) -------------------------------
function createSparkTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16; canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
}

// The dust hangs in a ring around the book: never inside it, never far from it.
// The book stands at the origin, MODEL_MAX_DIM tall, about 0.65 of that wide, centred on PIVOT_Y.
const SPARK_INNER = MODEL_MAX_DIM * 0.38, SPARK_OUTER = MODEL_MAX_DIM * 0.56;   // distance from the book's upright axis
const SPARK_BOTTOM = PIVOT_Y - MODEL_MAX_DIM * 0.57, SPARK_TOP = PIVOT_Y + MODEL_MAX_DIM * 0.64;
let sparkBaseColors;

function placeSpark(positions, idx, y) {
    const angle = Math.random() * Math.PI * 2;
    // denser close to the book, thinning outwards
    const r = SPARK_INNER + Math.pow(Math.random(), 1.6) * (SPARK_OUTER - SPARK_INNER);
    positions[idx]     = Math.cos(angle) * r;
    positions[idx + 1] = y;
    positions[idx + 2] = Math.sin(angle) * r;
}

function createSparks() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const colors = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
        placeSpark(positions, i * 3, SPARK_BOTTOM + Math.random() * (SPARK_TOP - SPARK_BOTTOM));

        const tone = Math.random();
        if (tone < 0.7) {
            // gold leaf, as on the cover's foil
            colors[i * 3] = 0.95;
            colors[i * 3 + 1] = 0.68 + Math.random() * 0.1;
            colors[i * 3 + 2] = 0.3 + Math.random() * 0.1;
        } else if (tone < 0.9) {
            // paper cream
            colors[i * 3] = 0.96;
            colors[i * 3 + 1] = 0.89;
            colors[i * 3 + 2] = 0.74;
        } else {
            // a few flecks of lattice teal
            colors[i * 3] = 0.42;
            colors[i * 3 + 1] = 0.7;
            colors[i * 3 + 2] = 0.64;
        }

        sparkData.push({
            speedY: 0.08 + Math.random() * 0.14,   // drifting dust, slower than forge sparks
            orbitSpeed: (0.06 + Math.random() * 0.1) * (Math.random() < 0.8 ? 1 : -1),
            swaySpeed: 0.5 + Math.random() * 1.5,
            swayRadius: 0.05 + Math.random() * 0.15,
            phase: Math.random() * Math.PI * 2
        });
    }
    sparkBaseColors = colors.slice();

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: createSparkTexture()
    });

    sparkParticles = new THREE.Points(geometry, material);
    scene.add(sparkParticles);
}

// ============================================================================
// The book
// ============================================================================
function loadImage(src) {
    return new Promise((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => { console.error('Could not load ' + src); resolve(null); };
        image.src = src;
    });
}

function paintCanvas(width, height, draw) {
    const c = document.createElement('canvas');
    c.width = width; c.height = height;
    draw(c.getContext('2d'), width, height);
    return c;
}

function paintCloth(ctx, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) { ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.13})`; ctx.fillRect(0, y, w, 1); }
    for (let x = 0; x < w; x += 3) { ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.035})`; ctx.fillRect(x, 0, 1, h); }
}

// One texture that tells the material where the gold foil is.
// R = emboss height (raised foil, and the pressed hinge groove), G = roughness, B = metalness.
// grooveU: where the hinge groove runs across the cover (0..1 from the left), or -1 for none.
function makeFoilMap(source, grooveU = -1) {
    try {
        const sw = source.naturalWidth || source.width, sh = source.naturalHeight || source.height;
        const w = Math.min(1024, sw), h = Math.max(1, Math.round(w * sh / sw));
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(source, 0, 0, w, h);
        const image = ctx.getImageData(0, 0, w, h), d = image.data;
        const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
        for (let i = 0; i < d.length; i += 4) {
            const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
            // foil is warm and bright, and far more yellow than the cream paper or the skin tones
            const gold = smooth(0.26, 0.36, g - b) * smooth(0.58, 0.78, r);
            const u = ((i / 4) % w) / w;
            const groove = grooveU >= 0 ? 0.45 * Math.exp(-(((u - grooveU) / 0.005) ** 2)) : 0;
            d[i]     = Math.max(0, 0.5 + 0.5 * gold - groove) * 255;
            d[i + 1] = (CLOTH_ROUGHNESS + (FOIL_ROUGHNESS - CLOTH_ROUGHNESS) * gold) * 255;
            d[i + 2] = FOIL_METALNESS * gold * 255;
            d[i + 3] = 255;
        }
        ctx.putImageData(image, 0, 0);
        const texture = new THREE.CanvasTexture(c);
        texture.anisotropy = 16;
        return texture;
    } catch (error) {
        console.warn('Foil map skipped:', error.message);
        return null;
    }
}

// A cased hardback, built the way one is bound: two boards with softened edges and
// corners, a rounded cloth spine, a page block that is rounded at the back and
// hollow at the fore-edge, set in from the boards by a small square, and a striped
// headband at the head and tail of the spine.
function buildBook(frontImage, backImage) {
    const FONT = `${CINZEL}, "Trajan Pro", Georgia, serif`;
    const GOLD = '#e9b758', MAROON = '#4f0b25';
    const H = 3.0;                                  // 3 units is the cover height (about 23 cm)
    const W = H * (frontImage ? frontImage.naturalWidth / frontImage.naturalHeight : 0.6554);
    const D = 0.22;                                 // overall thickness
    const T = 0.03;                                 // board thickness
    const ROUND = 0.05;                             // how far the rounded spine bulges out
    const SQUARE = 0.04;                            // how far the boards overhang the pages
    const PAGE_ROUND = 0.038;                       // the page block's rounded back
    const FORE_HOLLOW = 0.035;                      // ...and its matching hollow fore-edge
    const HINGE_U = 0.04;                           // the hinge groove, as a fraction of the board width

    const colorTexture = (source) => {
        const texture = source instanceof HTMLCanvasElement ? new THREE.CanvasTexture(source) : new THREE.Texture(source);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 16;
        texture.needsUpdate = true;
        return texture;
    };
    const printed = (source, grooveU = -1) => {
        const foil = makeFoilMap(source, grooveU);
        return new THREE.MeshPhysicalMaterial({
            map: colorTexture(source),
            roughness: foil ? 1.0 : 0.6, metalness: foil ? 1.0 : 0.15,
            roughnessMap: foil, metalnessMap: foil,
            bumpMap: foil, bumpScale: 0.9,
            specularIntensity: CLOTH_SHEEN,   // only dielectrics are dimmed; the foil keeps its full metal reflection
            envMapIntensity: 1.9,
            flatShading: false
        });
    };
    // stand-in cover, only if an image fails to load
    const plainCover = (lines) => paintCanvas(1311, 2000, (ctx, w, h) => {
        paintCloth(ctx, w, h, MAROON);
        ctx.strokeStyle = ctx.fillStyle = GOLD;
        ctx.lineWidth = 12; ctx.strokeRect(70, 70, w - 140, h - 140);
        ctx.lineWidth = 4;  ctx.strokeRect(104, 104, w - 208, h - 208);
        ctx.textAlign = 'center';
        ctx.font = `600 150px ${FONT}`;
        lines.forEach((line, i) => ctx.fillText(line, w / 2, h * 0.46 + i * 190));
    });

    // the spine is half an ellipse; size its artwork to the arc so the lettering is not stretched
    let spineArc = 0;
    for (let k = 0; k < 64; k++) {
        const th = (k + 0.5) / 64 * Math.PI;
        spineArc += Math.hypot(ROUND * Math.cos(th), (D / 2) * Math.sin(th)) * Math.PI / 64;
    }
    const spine = paintCanvas(Math.round(2000 * spineArc / H), 2000, (ctx, w, h) => {
        paintCloth(ctx, w, h, MAROON);
        ctx.fillStyle = GOLD;
        for (const y of [70, 96, h - 100, h - 74]) ctx.fillRect(0, y, w, y === 70 || y === h - 74 ? 10 : 3);
        ctx.translate(w / 2, h / 2); ctx.rotate(Math.PI / 2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `600 62px ${FONT}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '10px';
        ctx.fillText('MY VISION OF INDIA', 0, 4);
    });

    // page edges: fine leaves of off-white paper, shaded where they meet the boards
    const pageEdge = (leavesAlongU) => {
        const long = 1024, short = 256;
        const canvas = paintCanvas(leavesAlongU ? long : short, leavesAlongU ? short : long, (ctx, w, h) => {
            ctx.fillStyle = '#efe3c6';
            ctx.fillRect(0, 0, w, h);
            const n = leavesAlongU ? w : h;
            for (let i = 0; i < n; i += 2) {
                ctx.fillStyle = `rgba(118, 84, 46, ${0.05 + Math.random() * 0.16})`;
                leavesAlongU ? ctx.fillRect(i, 0, 1, h) : ctx.fillRect(0, i, w, 1);
            }
            const shade = leavesAlongU ? ctx.createLinearGradient(0, 0, w, 0) : ctx.createLinearGradient(0, 0, 0, h);
            shade.addColorStop(0, 'rgba(70, 36, 22, 0.5)');
            shade.addColorStop(0.07, 'rgba(70, 36, 22, 0)');
            shade.addColorStop(0.93, 'rgba(70, 36, 22, 0)');
            shade.addColorStop(1, 'rgba(70, 36, 22, 0.5)');
            ctx.fillStyle = shade;
            ctx.fillRect(0, 0, w, h);
        });
        const texture = colorTexture(canvas);
        return new THREE.MeshPhysicalMaterial({
            map: texture, bumpMap: texture, bumpScale: 0.25,
            roughness: 0.9, metalness: 0.0, specularIntensity: CLOTH_SHEEN, envMapIntensity: 0.5
        });
    };

    const front = printed(frontImage || plainCover(['My Vision', 'of India']), HINGE_U);
    const back  = printed(backImage  || plainCover(['The Short', 'Edition']), 1 - HINGE_U);
    const spineMaterial = printed(spine);
    spineMaterial.side = THREE.DoubleSide;
    const cloth = new THREE.MeshPhysicalMaterial({ color: MAROON, roughness: CLOTH_ROUGHNESS, metalness: 0.0, specularIntensity: CLOTH_SHEEN, envMapIntensity: 0.6 });
    const foreEdge = pageEdge(true);    // the fore-edge face: leaves stacked along u
    const headTail = pageEdge(false);   // top and bottom faces: leaves stacked along v

    // a board: a rounded rectangle (square at the hinge, rounded at the fore-edge corners),
    // bevelled all round, with the cover picture spanning the whole face
    const boardGeometry = (w, h, t, mirrorU) => {
        const bevel = 0.008, r = 0.024;
        const x0 = -w / 2 + bevel, x1 = w / 2 - bevel, y0 = -h / 2 + bevel, y1 = h / 2 - bevel;
        const shape = new THREE.Shape();
        shape.moveTo(x0, y0);
        shape.lineTo(x1 - r, y0);
        shape.quadraticCurveTo(x1, y0, x1, y0 + r);
        shape.lineTo(x1, y1 - r);
        shape.quadraticCurveTo(x1, y1, x1 - r, y1);
        shape.lineTo(x0, y1);
        shape.lineTo(x0, y0);
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: t - 2 * bevel, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel,
            bevelSegments: 3, curveSegments: 6
        });
        geometry.translate(0, 0, -(t - 2 * bevel) / 2);
        geometry.computeBoundingBox();
        const box = geometry.boundingBox, pos = geometry.attributes.position, uv = geometry.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
            const u = (pos.getX(i) - box.min.x) / (box.max.x - box.min.x);
            uv.setXY(i, mirrorU ? 1 - u : u, (pos.getY(i) - box.min.y) / (box.max.y - box.min.y));
        }
        uv.needsUpdate = true;
        return geometry;
    };

    const book = new THREE.Group();
    const place = (mesh, x, y, z) => { mesh.position.set(x, y, z); book.add(mesh); return mesh; };

    // boards run from the hinge to the fore-edge; the spine bulges beyond the hinge
    const boardW = W - ROUND, boardX = ROUND / 2;
    place(new THREE.Mesh(boardGeometry(boardW, H, T, false), [front, cloth]), boardX, 0,  D / 2 - T / 2);
    place(new THREE.Mesh(boardGeometry(boardW, H, T, true),  [back,  cloth]), boardX, 0, -D / 2 + T / 2);

    // the rounded cloth spine: half a cylinder, flattened to the bulge
    const spineMesh = place(new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, H, 40, 1, true, Math.PI, Math.PI), spineMaterial), -W / 2 + ROUND, 0, 0);
    spineMesh.scale.set(ROUND, 1, D / 2);

    // the page block: rounded at the back to sit in the spine, hollow at the fore-edge
    const xl = -W / 2 + ROUND + 0.004, xr = W / 2 - SQUARE;
    const pageH = H - 2 * SQUARE, pageD = D - 2 * T - 0.004;
    const pages = new THREE.BoxGeometry(xr - xl, pageH, pageD, 1, 1, 20);
    const pp = pages.attributes.position;
    for (let i = 0; i < pp.count; i++) {
        const zn = pp.getZ(i) / (pageD / 2), curve = 1 - zn * zn;
        pp.setX(i, pp.getX(i) - (pp.getX(i) > 0 ? FORE_HOLLOW : PAGE_ROUND) * curve);
    }
    pages.computeVertexNormals();
    place(new THREE.Mesh(pages, [foreEdge, foreEdge, headTail, headTail, foreEdge, foreEdge]), (xl + xr) / 2, 0, 0);

    // headbands: a cord of maroon and gold thread at the head and tail of the page block
    const bandCanvas = paintCanvas(32, 8, (ctx) => {
        ctx.fillStyle = MAROON; ctx.fillRect(0, 0, 16, 8);
        ctx.fillStyle = GOLD;   ctx.fillRect(16, 0, 16, 8);
    });
    const bandTexture = colorTexture(bandCanvas);
    bandTexture.wrapS = THREE.RepeatWrapping;
    bandTexture.repeat.set(22, 1);
    const band = new THREE.MeshPhysicalMaterial({ map: bandTexture, roughness: 0.55, metalness: 0.0, specularIntensity: 0.5, envMapIntensity: 0.8 });
    const bandX = xl + 0.012, bandZ = pageD / 2 * 0.95;
    for (const y of [pageH / 2, -pageH / 2]) {
        const path = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(bandX, y, -bandZ),
            new THREE.Vector3(bandX - 2 * PAGE_ROUND, y, 0),
            new THREE.Vector3(bandX, y, bandZ));
        place(new THREE.Mesh(new THREE.TubeGeometry(path, 24, 0.014, 8, false), band), 0, 0, 0);
    }

    book.rotation.y = 0.34;   // stands a little turned, so the spine and the page block read at first sight
    book.userData.footprint = { width: W, depth: D, rotationY: book.rotation.y };
    return book;
}

// Centering / scaling logic shared by the built-in book and an optional .glb
function mountModel(object, animations) {
    gltfModel = object;

    modelPivot = new THREE.Group();
    scene.add(modelPivot);
    modelPivot.add(gltfModel);

    const materials = new Set();
    gltfModel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            (Array.isArray(child.material) ? child.material : [child.material]).forEach((m) => m && materials.add(m));
        }
    });

    if (animations && animations.length > 0) {
        mixer = new THREE.AnimationMixer(gltfModel);
        animations.forEach((clip) => { mixer.clipAction(clip).play(); });
    }

    // 1. scale so the max dimension = MODEL_MAX_DIM
    const boxInitial = new THREE.Box3().setFromObject(gltfModel);
    const sizeInitial = boxInitial.getSize(new THREE.Vector3());
    const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
    const targetScale = MODEL_MAX_DIM / (maxDim > 0.0001 ? maxDim : 1);
    gltfModel.scale.setScalar(targetScale);

    // 2. update world matrix so the box accounts for scale
    gltfModel.updateMatrixWorld(true);

    // 3. exact geometric center of the scaled model
    const boxScaled = new THREE.Box3().setFromObject(gltfModel);
    const centerScaled = boxScaled.getCenter(new THREE.Vector3());

    // 4. recenter model so its center sits at the pivot origin
    gltfModel.position.sub(centerScaled);

    // 5. lower the pivot for a grounded stance
    modelPivot.position.y = PIVOT_Y;

    // 6. something to stand on: a soft contact shadow where the object meets the ground.
    //    (A full cast shadow from the key light was tried; with no visible floor it reads as a
    //    dark wedge floating in the background, so only the contact shadow is kept.)
    const groundY = -boxScaled.getSize(new THREE.Vector3()).y / 2;

    const footprint = object.userData.footprint;
    if (footprint) {
        const blob = paintCanvas(256, 256, (ctx) => {
            const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            g.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
            g.addColorStop(0.45, 'rgba(0, 0, 0, 0.45)');
            g.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, 256, 256);
        });
        const blobMaterial = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(blob), transparent: true, depthWrite: false });
        blobMaterial.userData.baseOpacity = 0.75;
        const contact = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), blobMaterial);
        contact.rotation.set(-Math.PI / 2, 0, footprint.rotationY);
        contact.scale.set(footprint.width * targetScale * 1.18, footprint.depth * targetScale * 3.2, 1);
        contact.position.y = groundY + 0.001;
        modelPivot.add(contact);
        materials.add(blobMaterial);
    }

    // the book fades into presence
    fadeMaterials = [...materials];
    fadeMaterials.forEach((m) => { m.transparent = true; m.opacity = 0; });
    fadeProgress = 0;
}

async function loadModel() {
    if (MODEL_URL) {
        try {
            const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
            gltf.scene.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.roughness = FOIL_ROUGHNESS;
                    child.material.metalness = FOIL_METALNESS;
                    child.material.flatShading = false;
                    if (child.material.map) child.material.map.anisotropy = 16;
                }
            });
            mountModel(gltf.scene, gltf.animations);
            return;
        } catch (error) {
            console.error('Error loading book model, using the built-in book:', error);
        }
    }
    const small = Math.min(screen.width, screen.height) * (window.devicePixelRatio || 1) < 1500
        || renderer.capabilities.maxTextureSize < 4096;
    const [frontImage, backImage] = await Promise.all([
        loadImage(IMAGES + (small ? 'cover-front-m.webp' : 'cover-front.webp')),
        loadImage(IMAGES + 'cover-back.webp'),
        Promise.race([document.fonts.load(`600 62px ${CINZEL}`), new Promise((r) => setTimeout(r, 2500))]).catch(() => {})
    ]);
    mountModel(buildBook(frontImage, backImage));
}

// ============================================================================
// Background wave shader (full-screen plane, child of camera)
// ============================================================================
function createBackgroundShader() {
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    // The damask: laid as tiles, sliding past as the camera circles the book,
    // and lit by a soft pool of light that follows the book around the screen.
    const fragmentShader = `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uScroll;
        uniform sampler2D uFabric;
        uniform float uFabricAspect;   // width / height of the fabric image
        uniform float uFabricReady;    // 0 until the image has loaded, then fades to 1
        uniform vec2 uBookPos;         // where the book is on screen, in the same units as uv

        void main() {
            // centred coordinates, in units of the viewport height
            vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
            float scroll = uScroll;

            // --- 1. The damask: one seamless repeat of the pattern, a little under half the screen tall ---
            float tileH = 0.42;
            vec2 st = (gl_FragCoord.xy / uResolution.y) / vec2(tileH * uFabricAspect, tileH);
            // as the camera circles the book the fabric slides past it, with a touch of pointer parallax
            st += vec2(scroll * 1.5 + uMouse.x * 0.012, scroll * 0.2 + uMouse.y * 0.008);
            vec3 fabric = texture2D(uFabric, st).rgb;

            // --- 2. Light: a soft pool around the book, falling away into shadow at the edges ---
            vec2 d = uv - uBookPos;
            float pool = exp(-dot(d, d) * 1.4);
            vec3 color = fabric * (0.3 + 0.26 * pool);   // kept dark: the pattern only just shows at the edges, a little more behind the book

            // deep maroon underneath, shown until the fabric has loaded
            color = mix(vec3(0.075, 0.008, 0.030), color, uFabricReady);

            float vignette = 1.0 - dot(uv, uv) * 0.34;
            color *= vignette;

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    Object.assign(shaderUniforms, {
        uFabric: { value: null },
        uFabricAspect: { value: 1 },
        uFabricReady: { value: 0 },
        uBookPos: { value: new THREE.Vector2(0, 0) }
    });
    new THREE.TextureLoader().load(
        IMAGES + 'damask.webp',
        (texture) => {
            // left in its own colour space: this shader writes straight to the screen without conversion
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;   // the image was made seamless for this
            texture.anisotropy = 8;
            shaderUniforms.uFabric.value = texture;
            shaderUniforms.uFabricAspect.value = texture.image.width / texture.image.height;
            fabricLoaded = true;
        },
        undefined,
        (error) => { console.error('Could not load the fabric background; keeping the plain maroon.', error); }
    );

    bgMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: shaderUniforms,
        depthWrite: false,
        depthTest: false
    });

    const bgGeometry = new THREE.PlaneGeometry(30, 30);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.set(0.0, 0.0, -8.0);   // local camera space, far behind
    bgMesh.renderOrder = -10;
    camera.add(bgMesh);                    // attach to camera so it always fills view
}

// ============================================================================
// Resize
// ============================================================================
function onWindowResize() {
    measure();
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    if (!renderer) return;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // gl_FragCoord is in device pixels, so the shader needs the drawing-buffer size, not the CSS size;
    // otherwise the waves and the vignette sit off-centre on high-density screens
    if (shaderUniforms) renderer.getDrawingBufferSize(shaderUniforms.uResolution.value);
}

// ============================================================================
// Pointer
// ============================================================================
window.addEventListener('mousemove', (event) => {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
});
window.addEventListener('resize', onWindowResize);

// ============================================================================
// Per-letter title split
// ============================================================================
function splitTitlesIntoChars() {
    const titles = document.querySelectorAll('.slide-title');
    titles.forEach(title => {
        const text = title.innerHTML;
        title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
        let newHTML = '';
        let delayCounter = 0;
        const parts = text.split(/(<br\s*\/?>)/i);
        parts.forEach(part => {
            if (part.toLowerCase().startsWith('<br')) {
                newHTML += part;
            } else {
                for (let i = 0; i < part.length; i++) {
                    if (part[i] === ' ') {
                        newHTML += ' ';
                    } else {
                        newHTML += `<span class="char" aria-hidden="true" style="transition-delay: ${delayCounter * 0.035}s">${part[i]}</span>`;
                        delayCounter++;
                    }
                }
            }
        });
        title.innerHTML = newHTML;
    });
}

// ============================================================================
// Animation loop
// ============================================================================
let lastFrame = performance.now();
let elapsed = 0;

function animate() {
    requestAnimationFrame(animate);
    let deltaTime;
    if (clock) {
        deltaTime = clock.getDelta();
    } else {
        const now = performance.now();
        deltaTime = (now - lastFrame) / 1000; lastFrame = now;
    }
    elapsed += deltaTime;
    if (mixer) mixer.update(deltaTime);

    // 1. target scroll [0..1] across the stage track; past it, the story holds on slide 4
    const scrollTop = window.scrollY;
    const targetScroll = Math.min(1, scrollTop / layout.story);

    // smooth physical lerp (inertia)
    // follows the scroll closely (about a sixth of a second behind), the same at any frame rate
    currentScroll += (targetScroll - currentScroll) * (1 - Math.exp(-deltaTime * 7));

    // smooth model rotation lerp
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    updateSlides(currentScroll, targetScroll);
    updateGridDots(currentScroll);
    if (!renderer) return;
    // once the chapters cover the stage, there is nothing to draw until the reader comes back
    if (scrollTop >= layout.chaptersTop) return;

    // gentle interactive model tilt from mouse
    if (modelPivot) {
        modelPivot.rotation.y = mouseX * 0.25;
        modelPivot.rotation.x = mouseY * 0.15;
    }

    // the book fades into presence once its covers have resolved
    if (fadeProgress < 1) {
        fadeProgress = Math.min(1, fadeProgress + deltaTime / 1.6);
        const opacity = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
        fadeMaterials.forEach((m) => { m.opacity = opacity * (m.userData.baseOpacity ?? 1); });
        // shadows stay transparent; everything else becomes solid again once it has faded in
        if (fadeProgress === 1) fadeMaterials.forEach((m) => {
            if (m.userData.baseOpacity === undefined) { m.transparent = false; m.needsUpdate = true; }
        });
    }

    // 2. sparks physics, accelerated/turbulent on fast scroll
    if (sparkParticles) {
        const positions = sparkParticles.geometry.attributes.position.array;
        const time = clock.getElapsedTime();
        const scrollVelocity = Math.abs(targetScroll - currentScroll);
        const speedMultiplier = 1.0 + scrollVelocity * 9.0;
        const turbulence = scrollVelocity * 0.8;

        const colors = sparkParticles.geometry.attributes.color.array;

        for (let i = 0; i < sparkCount; i++) {
            const idx = i * 3;
            const data = sparkData[i];
            let x = positions[idx], z = positions[idx + 2];

            // rise, and circle slowly around the book
            positions[idx + 1] += data.speedY * deltaTime * speedMultiplier;
            const turn = data.orbitSpeed * deltaTime * speedMultiplier;
            const cos = Math.cos(turn), sin = Math.sin(turn);
            [x, z] = [x * cos - z * sin, x * sin + z * cos];

            const currentSway = data.swayRadius * (1.0 + turbulence * 4.0);
            x += Math.sin(time * data.swaySpeed + data.phase) * currentSway * deltaTime;
            z += Math.cos(time * data.swaySpeed + data.phase) * currentSway * deltaTime;

            // the sway may push a fleck into the book or away from it: keep it in the ring
            const r = Math.hypot(x, z);
            const clamped = Math.min(SPARK_OUTER, Math.max(SPARK_INNER, r));
            if (r > 0) { x *= clamped / r; z *= clamped / r; }
            positions[idx] = x;
            positions[idx + 2] = z;

            // recycle at the top, back in at the bottom
            if (positions[idx + 1] > SPARK_TOP) placeSpark(positions, idx, SPARK_BOTTOM);

            // fade in at the bottom and out at the top (additive, so dimmer reads as fainter)
            const h = (positions[idx + 1] - SPARK_BOTTOM) / (SPARK_TOP - SPARK_BOTTOM);
            const fade = Math.min(1, h / 0.2, (1 - h) / 0.3);
            colors[idx]     = sparkBaseColors[idx] * fade;
            colors[idx + 1] = sparkBaseColors[idx + 1] * fade;
            colors[idx + 2] = sparkBaseColors[idx + 2] * fade;
        }
        sparkParticles.geometry.attributes.position.needsUpdate = true;
        sparkParticles.geometry.attributes.color.needsUpdate = true;
    }

    // 3. camera orbits the model 360° driven by scroll
    // On a portrait screen the orbit widens so the whole book fits, and the framing
    // lifts the book into the upper half, clear of the text below it.
    const portrait = sizes.width < sizes.height;
    const fit = portrait ? 1.0 + (1.0 - sizes.width / sizes.height) * 2.6 : 1.0;
    const phi = currentScroll * Math.PI * 2.0;
    const y = 0.35 + Math.sin(currentScroll * Math.PI) * 0.8;
    const radius = (4.2 - Math.sin(currentScroll * Math.PI) * 0.4) * fit;   // swings in only a little mid-orbit, so the book stays in frame
    const x = radius * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // shift the framing so the book always stands clear of the text columns of the slide on stage,
    // and comes back to centre between slides
    const lookAtXOffset = portrait ? 0 : framingOffset(currentScroll);
    const targetPos = new THREE.Vector3(x, y, z);
    camera.position.lerp(targetPos, 1 - Math.exp(-deltaTime * 6));
    // the offset is applied along the camera's own right-hand axis, so "to the right"
    // stays to the right on screen all the way round the orbit (at phi = 0 this is plain x)
    const azimuth = Math.atan2(camera.position.x, camera.position.z);
    const targetLookAt = new THREE.Vector3(
        lookAtXOffset * Math.cos(azimuth), portrait ? -1.85 : -0.15, -lookAtXOffset * Math.sin(azimuth));
    camera.lookAt(targetLookAt);
    viewLight.position.copy(camera.position).add(new THREE.Vector3(0, 1.2, 0));

    // background shader uniforms
    if (shaderUniforms) {
        shaderUniforms.uTime.value = clock.getElapsedTime();
        shaderUniforms.uMouse.value.set(mouseX, -mouseY);
        shaderUniforms.uScroll.value = currentScroll;

        // the fabric fades in once loaded, and its light pool follows the book across the screen
        if (fabricLoaded && shaderUniforms.uFabricReady.value < 1) {
            shaderUniforms.uFabricReady.value = Math.min(1, shaderUniforms.uFabricReady.value + deltaTime / 1.2);
        }
        if (modelPivot) {
            camera.updateMatrixWorld();
            bookScreen = bookScreen || modelPivot.position.clone();
            bookScreen.copy(modelPivot.position).project(camera);
            const aspect = sizes.width / sizes.height;
            shaderUniforms.uBookPos.value.lerp(new THREE.Vector2(bookScreen.x * 0.5 * aspect, bookScreen.y * 0.5), 0.08);
        }
    }

    renderer.render(scene, camera);
}

// ---- Framing: where the camera looks, left/right, across the scroll ----
// [scroll, lookAt x]. Negative puts the book right of centre, positive left of it.
const FRAMING = [
    [0.00, -1.05], [0.10, -1.05],   // slide 1: text in columns one and two, book to the right
    [0.20,  0.00],                  // centre stage
    [0.28, -1.5], [0.40, -1.5],     // slide 2: title and text on the left, book to the right
    [0.48,  0.00],                  // centre stage: the back cover, in full
    [0.56,  1.25], [0.68,  1.25],   // slide 3: text in columns three and four, book to the left
    [0.76,  0.00],                  // centre stage
    [0.84, -1.1], [1.00, -1.1]      // slide 4: the front cover again; text on the left, like slide 1
];
function framingOffset(scroll) {
    if (scroll <= FRAMING[0][0]) return FRAMING[0][1];
    for (let i = 0; i < FRAMING.length - 1; i++) {
        const a = FRAMING[i], b = FRAMING[i + 1];
        if (scroll <= b[0]) {
            const k = (1.0 - Math.cos(((scroll - a[0]) / (b[0] - a[0])) * Math.PI)) * 0.5;   // cosine ease
            return a[1] + (b[1] - a[1]) * k;
        }
    }
    return FRAMING[FRAMING.length - 1][1];
}

// ---- Grid dots drift ----------------------------------------------------------
function updateGridDots(scroll) {
    const dots = document.querySelectorAll('.grid-dot');
    dots.forEach((dot, i) => {
        const startY = (i * 17) % 80 + 10;
        let speed = 90 + (i * 55) % 180;
        if (i % 2 === 0) speed = -speed;
        let y = startY + scroll * speed;
        y = ((y % 100) + 100) % 100;
        dot.style.top = `${y}%`;
    });
}

// ---- Slides + stories progress ---------------------------------------------------
function updateSlides(scroll, target = scroll) {
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const slide3 = document.getElementById('slide-3');
    const slide4 = document.getElementById('slide-4');

    for (let i = 1; i <= 4; i++) {
        const fill = document.getElementById(`dash-fill-${i}`);
        if (fill) {
            const start = (i - 1) * 0.25;
            const end = i * 0.25;
            let progress = (scroll - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));
            fill.style.height = `${progress * 100}%`;
        }
    }

    // a slide only plays when the page is arriving at it, not when passing it on the way somewhere else
    const passing = Math.abs(target - scroll) > 0.2;
    function isActive(val, start, end) { return !passing && val >= start && val <= end; }

    if (slide1) slide1.classList.toggle('active', isActive(scroll, -0.10, 0.12));
    if (slide2) slide2.classList.toggle('active', isActive(scroll, 0.28, 0.40));
    if (slide3) slide3.classList.toggle('active', isActive(scroll, 0.56, 0.68));
    if (slide4) slide4.classList.toggle('active', isActive(scroll, 0.84, 1.05));
}

// ---- Navigation -----------------------------------------------------------------------
// The browser does all the scrolling: nothing is intercepted, so it feels native and smooth on
// every trackpad, mouse and phone, and the book turns with the finger. Only once the page has
// come fully to rest (momentum and all) and stayed still for a moment, and only if it rests close
// to a slide, does it ease the last little way onto that slide. Stopped between slides, it stays
// put. Any wheel, touch or key cancels a pending ease. Keys, the header links and the progress
// marks glide straight from stop to stop.
const STOPS = [0.0, 0.34, 0.62, 1.0];   // the slides, as fractions of the stage track
const CHAPTERS = STOPS.length;          // the stop after the last slide

function setupNavigation() {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const stopY = (i) => (i < CHAPTERS ? Math.round(STOPS[i] * layout.story) : layout.chaptersTop);
    const overStage = (y) => y < layout.chaptersTop - 1;
    const nearestSlide = (y) => STOPS.reduce((best, _, i) => (Math.abs(stopY(i) - y) < Math.abs(stopY(best) - y) ? i : best), 0);
    const dialogOpen = () => !!document.querySelector('dialog[open]');

    const here = () => (overStage(window.scrollY) ? nearestSlide(window.scrollY) : CHAPTERS);

    // a glide is the browser's own smooth scroll to a stop
    let restIndex = here();
    let glidingUntil = 0;
    function glideTo(to) {
        glidingUntil = performance.now() + 1200;
        window.scrollTo({ top: to, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    function goTo(i) {
        restIndex = Math.max(0, Math.min(CHAPTERS, i));
        glideTo(stopY(restIndex));
    }

    // at rest near a stop, ease onto it
    let quiet = 0;
    function easeOntoNearStop() {
        if (dialogOpen() || reducedMotion.matches || performance.now() < glidingUntil) return;
        const y = window.scrollY;
        if (y > layout.chaptersTop + 2) return;
        let best = 0;
        for (let i = 1; i <= CHAPTERS; i++) if (Math.abs(stopY(i) - y) < Math.abs(stopY(best) - y)) best = i;
        const gap = Math.min(...[best - 1, best + 1].filter((j) => j >= 0 && j <= CHAPTERS).map((j) => Math.abs(stopY(j) - stopY(best))));
        const off = Math.abs(stopY(best) - y);
        if (off > 2 && off < gap * 0.22) goTo(best);
    }
    const whenStill = () => { clearTimeout(quiet); quiet = setTimeout(easeOntoNearStop, 380); };
    window.addEventListener('onscrollend' in window ? 'scrollend' : 'scroll', whenStill, { passive: true });
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => window.addEventListener(type, () => clearTimeout(quiet), { passive: true }));

    // over the stage, keys move exactly one stop; in the chapters they scroll as usual
    window.addEventListener('keydown', (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey || dialogOpen()) return;
        if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
        if (e.key === 'Home') { e.preventDefault(); goTo(0); return; }
        if (window.scrollY > layout.chaptersTop + 2) return;
        const onControl = e.target.closest && e.target.closest('button, a');
        const moves = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 };
        let step = 0;
        if (moves[e.key]) step = moves[e.key];
        else if (e.key === ' ' && !onControl) step = e.shiftKey ? -1 : 1;
        if (!step) return;
        const from = performance.now() < glidingUntil ? restIndex : here();   // quick presses keep moving on
        const next = from + step;
        if (next > CHAPTERS || next < 0) return;
        e.preventDefault();
        goTo(next);
    });

    const navLinks = [...document.querySelectorAll('.nav-link')];
    const dashes = [...document.querySelectorAll('.story-dash')];
    document.querySelectorAll('[data-stop]').forEach((link) => link.addEventListener('click', (e) => { e.preventDefault(); goTo(+link.dataset.stop); }));
    dashes.forEach((dash, i) => dash.addEventListener('click', () => goTo(i)));
    document.querySelectorAll('[data-section]').forEach((link) => link.addEventListener('click', (e) => {
        e.preventDefault();
        restIndex = CHAPTERS;
        glideTo(Math.round(document.getElementById(link.dataset.section).getBoundingClientRect().top + window.scrollY));
    }));

    // show where the reader is, retire the "Scroll" hint once they have moved,
    // and give the header a backing once the chapters run beneath it
    const books = document.getElementById('books');
    let current = null;
    const onScroll = () => {
        const y = window.scrollY;
        let here;
        if (y < layout.chaptersTop - window.innerHeight * 0.5) here = String(nearestSlide(y));
        else {
            const box = books.getBoundingClientRect();
            here = box.top < window.innerHeight * 0.5 && box.bottom > window.innerHeight * 0.5 ? 'books' : '';
        }
        if (here !== current) {
            current = here;
            const mark = (el, on) => (on ? el.setAttribute('aria-current', 'true') : el.removeAttribute('aria-current'));
            navLinks.forEach((link) => mark(link, (link.dataset.stop ?? link.dataset.section) === here));
            dashes.forEach((dash, i) => mark(dash, String(i) === here));
        }
        const root = document.documentElement;
        root.classList.toggle('has-scrolled', y > 24);
        root.classList.toggle('past-stage', y > layout.chaptersTop - 90);
        root.classList.toggle('stage-off', y > layout.chaptersTop + 4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
}

// ============================================================================
// Bootstrap
// ============================================================================
splitTitlesIntoChars();
if (THREE) {
    try {
        initScene();
    } catch (error) {
        console.warn('WebGL is unavailable; showing the page without the 3D stage.', error);
        renderer = null;
    }
}
if (!renderer) document.body.classList.add('no-gl');
onWindowResize();
animate();
setupNavigation();
