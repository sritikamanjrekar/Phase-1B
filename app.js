import * as THREE from "three";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Variables
let scene, camera, renderer, model, raycaster, mouse;

// Initialize the scene
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('scene-container').appendChild(renderer.domElement);

  // Add lights if needed
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(2, 2, 2);
  scene.add(pointLight);

  // Load the 3D model
  const loader = new THREE.GLTFLoader();
  loader.load('laptop.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);
  });

  // Set up raycasting for click events
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('click', onClick, false);
}

// Handle mouse move events
function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

// Handle click events
function onClick(event) {
  raycaster.setFromCamera(mouse, camera);

  // Intersect objects in the scene
  const intersects = raycaster.intersectObjects([model]);

  if (intersects.length > 0) {
    alert('You clicked on the 3D model!');
  }
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Initialize the scene and start the animation
init();
animate();
