import * as THREE from 'three';
import { basicSetup } from './basicSetup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

initScene();

function initScene() {
  const { scene, renderer } = basicSetup(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

  camera.position.z = -5;
  camera.position.y = 5;

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableDamping = true;

  const gridHelper = new THREE.GridHelper(500, 500);
  scene.add(gridHelper);

  const cubeShape = new THREE.BoxGeometry(5, 5, 5);
  const cubeMatherial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cubeMesh = new THREE.Mesh(cubeShape, cubeMatherial);
  cubeMesh.position.set(0, 2.5, 0);

  scene.add(cubeMesh);


  animate();

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

}
