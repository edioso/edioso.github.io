import * as THREE from 'three';
import energiaData from '../energia_renovable_1965_2025.json' assert { type: 'json' };

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 40, 80);
camera.lookAt(0, 0, 0);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 50, 50).normalize();
scene.add(light);

// Crear barras por país y año
const countries = Object.keys(energiaData);
const years = Array.from({ length: 2025 - 1965 + 1 }, (_, i) => 1965 + i);

countries.forEach((pais, i) => {
  years.forEach((año, j) => {
    const valor = energiaData[pais][año] || 0;
    const altura = valor / 100; // Escalado

    const geometry = new THREE.BoxGeometry(1, altura, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00aaff });
    const bar = new THREE.Mesh(geometry, material);

    bar.position.set(i * 2, altura / 2, j * 2);
    scene.add(bar);
  });
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
