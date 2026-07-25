import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { basicSetup } from './basicSetup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createFloor } from './createFloor';

const TIME_STEP = 1 / 60;

initScene();

function initScene() {
  const { scene, renderer } = basicSetup(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.z = -30;
  camera.position.y = 20;

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableDamping = true;

  const { floorMesh, floorBody } = createFloor(50, 50);
  scene.add(floorMesh);

  const SPHERE_RADIUS_1 = 1;
  const SPHERE_RADIUS_2 = 0.8;
  const SPHERE_RADIUS_3 = 1.1;

  const sphereGeometry1 = new THREE.SphereGeometry(SPHERE_RADIUS_1);
  const sphereMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);


  const sphereBody1 = new CANNON.Body({
    shape: new CANNON.Sphere(SPHERE_RADIUS_1),
    mass: 0.1
  });
  sphereBody1.position.y = 20;
  sphereBody1.linearDamping = 0.25;

  scene.add(sphereMesh1);

  const sphereGeometry2 = new THREE.SphereGeometry(SPHERE_RADIUS_2);
  const sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);

  const sphereBody2 = new CANNON.Body({
    shape: new CANNON.Sphere(SPHERE_RADIUS_2),
    mass: 0.4
  });
  sphereBody2.position.y = 30;
  sphereBody2.position.x = 0.5;
  sphereBody2.linearDamping = 0.2;

  scene.add(sphereMesh2);

  const sphereGeometry3 = new THREE.SphereGeometry(SPHERE_RADIUS_3);
  const sphereMaterial3 = new THREE.MeshBasicMaterial({ color: 0xaaffaa });
  const sphereMesh3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);

  scene.add(sphereMesh3);

  const sphereBody3 = new CANNON.Body({
    shape: new CANNON.Sphere(SPHERE_RADIUS_3),
    mass: 0.05
  });
  sphereBody3.position.set(-5, SPHERE_RADIUS_3, 1.5);
  sphereBody3.linearDamping = 0.09;


  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.8, 0)
  });

  world.addBody(floorBody);
  world.addBody(sphereBody1);
  world.addBody(sphereBody2);
  world.addBody(sphereBody3);

  animate();

  function animate() {
    world.step(TIME_STEP);
    sphereMesh1.position.copy(sphereBody1.position);
    sphereMesh2.position.copy(sphereBody2.position);
    sphereMesh3.position.copy(sphereBody3.position);
    orbit.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

}
