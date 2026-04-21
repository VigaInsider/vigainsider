import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 0. IMPOSTAZIONE FPS
let lastTime = performance.now();
let frameCount = 0;
let fps = 0;
const fpsDisplay = document.getElementById('fps-counter');

// 1a. INIZIALIZZAZIONE CARICAMENTO ASSETS
const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    // Testo iniziale
    document.getElementById("loading-text").innerHTML = "IDENTIFICAZIONE RISORSE...";
};
manager.onLoad = function () {
    const loadingText = document.getElementById("loading-text");
    // Testo in italiano, tecnico e pulito
    loadingText.innerHTML = "CARICAMENTO COMPLETATO CON SUCCESSO";
    // Estetica finale: testo fisso e brillante
    loadingText.style.animation = "none";
    loadingText.style.color = "#ffffff";
    loadingText.style.textShadow = "0 0 15px var(--green-bright)";
    loadingText.style.opacity = "1";
    // Timeout per lasciare all'utente il tempo di leggere il successo
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // MOSTRA IL POPUP DEL NOME
            document.getElementById('name-popup-overlay').style.display = 'flex';
        }, 800);
    }, 500);
    animate(); // Parte il loop di Three.js
};
manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const percent = Math.round((itemsLoaded / itemsTotal) * 100);
    // Estraiamo solo il nome del file dall'URL per pulizia
    // Esempio: "assets/models/bottiglia.glb" diventa "bottiglia.glb"
    const fileName = url.split('/').pop().toUpperCase();
    // Aggiorniamo la barra
    const bar = document.getElementById('loading-bar');
    if (bar) bar.style.width = percent + '%';
    // Nuovo formato del testo: NOME_FILE [XX%]
    document.getElementById("loading-text").innerHTML = `${fileName} [${percent}%]`;
};
manager.onError = function (url) {
    document.getElementById("loading-text").innerHTML = `ERRORE CARICAMENTO: ${url.split('/').pop()}`;
    document.getElementById("loading-text").style.color = "#ff4d4d";
};
// GESTIONE CONFERMA NOME
document.getElementById('confirm-name-btn').addEventListener('click', function() {
    const input = document.getElementById('username-input');
    const name = input.value.trim();
    localStorage.setItem("username", name);
    // 1. Nascondi il Popup
    const popup = document.getElementById('name-popup-overlay');
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        popup.style.display = 'none';

        // 2. MOSTRA LA SCHERMATA INIZIALE (Controlli e Titolo)
        const mainContent = document.getElementById('main-start-content');
        mainContent.style.display = 'flex';
        // Piccolo trucco per l'animazione di entrata (fade in)
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transition = 'opacity 1s ease';
        }, 50);

    }, 500);
});

// 1b. SCENA E CAMERA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x33ccff); // Cielo più azzurro
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
})
// AGGIUNTA MARE
const oceanGeometry = new THREE.PlaneGeometry(2000, 2000);
const oceanMaterial = new THREE.MeshStandardMaterial({
    color: 0x0077be,
    transparent: true,
    opacity: 0.8
});
const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = -0.2; // Leggermente sotto l'isola
scene.add(ocean);

// 2. LUCI E AMBIENTE
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(10, 20, 10);
scene.add(sunLight);

const islandGroup = new THREE.Group();

const altezzaIsola = 0.5; // Quanto sta il prato sopra il livello del mare (0.0)
const altezzaOcchi = 1.6; // L'altezza standard della telecamera

// --- IL FONDALE (Sabbia scura sul fondo) ---
const floorGeo = new THREE.PlaneGeometry(1000, 1000);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a }); // Grigio scuro/Fondale
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3; // 5 metri sotto il livello del mare
scene.add(floor);

// --- IL PRATO ---
const raggioPrato = 19;
const grassGeo = new THREE.CircleGeometry(raggioPrato, 64);
const grassMat = new THREE.MeshStandardMaterial({ color: 0x4df556 });
const grass = new THREE.Mesh(grassGeo, grassMat);
grass.rotation.x = -Math.PI / 2;

// Posizioniamo il prato all'altezza desiderata
grass.position.y = altezzaIsola;
islandGroup.add(grass);

// --- LA SABBIA (Cilindro Svasato) ---
const altezzaSabbia = 1.5; // Altezza totale del blocco sabbia
const sandGeo = new THREE.CylinderGeometry(raggioPrato, 22 + 10, altezzaSabbia + 3, 64, 1, true); 
const sandMat = new THREE.MeshStandardMaterial({ color: 0xedc9af, side: THREE.DoubleSide });
const sand = new THREE.Mesh(sandGeo, sandMat);

// Per far combaciare la cima del cilindro con il prato:
// L'altezza è 1.5, il centro del cilindro deve stare a (AltezzaIsola - metà altezza cilindro)
sand.position.y = altezzaIsola - (altezzaSabbia / 2) - 1.5;
islandGroup.add(sand);

scene.add(islandGroup);
scene.fog = new THREE.Fog(0x33ccff, 20, 100);

// 3. CONTROLLI
window.totalTime;
class PausableTimer {
    constructor(callback, delay) {
        this.callback = callback;
        this.delay = delay; // salvi il delay originale
        this.remaining = delay;
        this.timerId = null;
        this.start = null;
        this.loop = null;
        this.cont = 0;
        window.totalTime = delay / 1000;
    }
    pause() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
            // Calcola il tempo passato
            this.remaining -= Date.now() - this.start;
        }
        if (this.loop) {
            clearInterval(this.loop);
            this.loop = null;
        }
        console.log("pausa");
    }
    resume() {
        console.log("resume");
        if (this.timerId) return; // già in esecuzione
        if (this.remaining > 0) {
            this.start = Date.now();
            this.timerId = setTimeout(() => {
                this.pause();
                this.callback();
            }, this.remaining);

            // Se il ciclo di aggiornamento non è già attivo, avvialo
            if (!this.loop) {
                this.loop = setInterval(() => {
                    this.cont++;
                    // Aggiorna il timer visualizzato
                    document.getElementById("minuti").innerHTML = String(Math.floor((window.totalTime - this.cont) / 60)).padStart(2, '0');
                    document.getElementById("secondi").innerHTML = String((window.totalTime - this.cont) % 60).padStart(2, '0');
                    console.log(`${document.getElementById("minuti").innerHTML}:${document.getElementById("secondi").innerHTML}`);
                }, 1000);
            }
        }
    }
}
const timer = new PausableTimer(() => {
    localStorage.setItem("punteggioFase1", document.getElementById("score").innerHTML.trim());
    window.location = "?pagina=mid";
}, 60000)
function lock() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('punti').style.display = 'block';
    document.getElementById('tempo').style.display = 'block';
    document.getElementById('crosshair').style.display = 'block';
    document.getElementById('fps-counter').style.display = 'block';
}
function unlock() {
    timer.pause();
    document.getElementById('start').style.display = 'flex';
    document.getElementById('punti').style.display = 'none';
    document.getElementById('tempo').style.display = 'none';
    document.getElementById('crosshair').style.display = 'none';
    document.getElementById('fps-counter').style.display = 'none';
}
const controls = new PointerLockControls(camera, document.body);
document.getElementById('start').addEventListener('click', () => {
    controls.lock();
    lock();
});
controls.addEventListener('lock', () => {
    lock();
    timer.resume();
});
controls.addEventListener('unlock', () => { unlock(); });

// 4. GESTIONE OGGETTI DI SCENA (20 rifiuti + 6 alberi)
const trashArray = [];
let score = 0;
const loader = new GLTFLoader(manager);

/*loader.load('assets/models/rifiuto.glb', (gltf) => {
    const mesh = gltf.scene.getObjectByName("Trash_Pile_03_GEO");
    mesh.geometry.center(); // Centra l'oggetto per collisioni precise
    for (let i = 0; i < 20; i++) {
        const clone = mesh.clone();
        scene.add(clone);
        trashArray.push(clone);
        spawn(clone, 0.2);
    }
});*/
loader.load('assets/models/trashpile-v1.glb', (gltf) => {
    const mesh = gltf.scene;
    for (let i = 0; i < 20; i++) {
        const clone = mesh.clone();
        scene.add(clone);
        trashArray.push(clone);
        spawn(clone, 0.2);
    }
});

loader.load('assets/models/tree.glb', (gltf) => {
    const mesh = gltf.scene;
    mesh.scale.set(4, 4, 4);
    console.log(mesh);

    function spawn(obj, radius, minDistance) {
        const points = [];
        const attempts = 1000; // Numero massimo di tentativi per trovare un punto valido
        for (let i = 0; i < attempts; i++) {
            let angle = Math.random() * 2 * Math.PI;
            let dist = Math.random() * radius;
            let x = dist * Math.cos(angle);
            let z = dist * Math.sin(angle);
            let valid = true;
            for (let j = 0; j < points.length; j++) {
                const dx = x - points[j].x;
                const dz = z - points[j].z;
                const distance = Math.sqrt(dx * dx + dz * dz);
                if (distance < minDistance) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                points.push({ x: x, z: z });
            }
        }

        // Spawna gli alberi nei punti generati
        for (let i = 0; i < points.length; i++) {
            const clone = obj.clone();
            const a = Math.random() * Math.PI * 2;
            const r = Math.random() * 18;
            const x = Math.cos(a) * r;
            const z = Math.sin(a) * r;
            // Y deve essere altezzaIsola + un piccolo offset
            clone.position.set(points[i].x, altezzaIsola - 0.1, points[i].z);
            clone.rotation.y = Math.random() * Math.PI * 2; // Rotazione tra 0 e 360 gradi
            scene.add(clone);
        }
    }
    spawn(mesh, 18, 8); // Raggio 18, distanza minima 5
});
console.log(scene)

function spawn(obj) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 18;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    // Y deve essere altezzaIsola + un piccolo offset
    obj.position.set(x, altezzaIsola + 0.1, z);
}

// 5. MOVIMENTO E COLLISIONI
const arrow = false;
const keys = {};
document.onkeydown = (e) => keys[e.code] = true;
document.onkeyup = (e) => keys[e.code] = false;

// Setup Raycaster (fuori dal loop animate)
const raycaster = new THREE.Raycaster();
const downVector = new THREE.Vector3(0, -1, 0);

// --- CONFIGURAZIONE MOVIMENTO ---
let canLeaveIsland = false; // Se false, l'acqua blocca il movimento.
let lastSafePosition = camera.position.clone();

function animate() {
    requestAnimationFrame(animate);
    // --- Calcolo FPS ---
    frameCount++;
    const currentTime = performance.now();
    // Ogni secondo (1000ms) aggiorniamo il contatore visivo
    if (currentTime >= lastTime + 1000) {
        fps = frameCount;
        fpsDisplay.innerText = `FPS: ${fps}`;
        // Colore dinamico: verde se fluido, giallo/rosso se lagga
        if (fps < 30) fpsDisplay.style.color = "#ff4d4d";
        else if (fps < 55) fpsDisplay.style.color = "#f1c40f";
        else fpsDisplay.style.color = "var(--green-bright)";

        frameCount = 0;
        lastTime = currentTime;
    }

    if (controls.isLocked) {
        // 1. Salva la posizione attuale prima del movimento
        const oldPos = camera.position.clone();

        // 2. Esegui il movimento WASD
        if (arrow) {
            if (keys['ArrowUp']) controls.moveForward(0.15);
            if (keys['ArrowDown']) controls.moveForward(-0.15);
            if (keys['ArrowLeft']) controls.moveRight(-0.15);
            if (keys['ArrowRight']) controls.moveRight(0.15);
        } else {
            if (keys['KeyW']) controls.moveForward(0.15);
            if (keys['KeyS']) controls.moveForward(-0.15);
            if (keys['KeyA']) controls.moveRight(-0.15);
            if (keys['KeyD']) controls.moveRight(0.15);
        }

        // 3. --- GESTIONE ALTEZZA DINAMICA ---
        const rayOrigin = camera.position.clone();
        rayOrigin.y = 10; // Spara dall'alto verso il basso
        raycaster.set(rayOrigin, downVector);

        // Controlliamo Prato e Sabbia
        const intersects = raycaster.intersectObjects([grass, sand]);

        if (intersects.length > 0) {
            // Logica del "Punto più alto":
            // Se il raggio colpisce sia prato che sabbia, prendiamo il prato.
            let highestPoint = -Infinity;
            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].point.y > highestPoint) {
                    highestPoint = intersects[i].point.y;
                }
            }

            // Applichiamo l'altezza alla camera
            camera.position.y = highestPoint + altezzaOcchi;

            // --- CONTROLLO BARRIERA ACQUA ---
            // Se il punto più alto è sotto il livello del mare (0)
            // e non possiamo uscire, blocchiamo il movimento
            if (!canLeaveIsland && highestPoint < 0) {
                camera.position.x = oldPos.x;
                camera.position.z = oldPos.z;
                camera.position.y = oldPos.y;
            } else {
                // Posizione valida, la salviamo
                lastSafePosition.copy(camera.position);
                camera.position.y = camera.position.y > (-2.25 + altezzaOcchi) ? camera.position.y : (-2.25 + altezzaOcchi);
            }
        } else {
            // --- FUORI DALL'ISOLA (VUOTO) ---
            if (!canLeaveIsland) {
                camera.position.copy(oldPos);
            } else {
                camera.position.y = -2.25 + altezzaOcchi; // Volo sull'acqua
            }
        }

        // --- COLLISIONI RIFIUTI ---
        trashArray.forEach(t => {
            if (camera.position.distanceTo(t.position) < 1.8) {
                score++;
                document.getElementById('score').innerText = score;
                spawn(t);
            }
        });
    }

    renderer.render(scene, camera);
}
document.getElementById("minuti").innerHTML = String(Math.floor(window.totalTime / 60)).padStart(2, '0');
document.getElementById("secondi").innerHTML = String(window.totalTime % 60).padStart(2, '0');