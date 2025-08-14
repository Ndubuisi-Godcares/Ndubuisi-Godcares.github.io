// ===============================
// Dynamic Year
// ===============================
document.getElementById('year').textContent = new Date().getFullYear();

// ===============================
// Mobile Menu Toggle
// ===============================
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// ===============================
// Scroll Fade-In Animation
// ===============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// ===============================
// Card Tilt Effect
// ===============================
VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.4
});

// ===============================
// Three.js Particle Background for Hero
// ===============================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('hero-canvas'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const particlesCount = 4000;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 5;
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.006,
  color: 0x00ffff
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Animate
function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Mouse Interaction
document.addEventListener('mousemove', (event) => {
  particlesMesh.rotation.y = event.clientX * 0.0001;
  particlesMesh.rotation.x = event.clientY * 0.0001;
});

// Handle Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
