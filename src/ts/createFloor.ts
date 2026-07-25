import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createFloor(width: number, height: number) {
  const groundGeometry = new THREE.PlaneGeometry(width, height);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const texture = createCheckerTexture();
  groundMaterial.map = texture;
  const floorMesh = new THREE.Mesh(groundGeometry, groundMaterial);

  const floorBody = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, 0.1))
  });

  floorMesh.rotation.x = -Math.PI / 2;
  floorBody.position.set(floorMesh.position.x, floorMesh.position.y, floorMesh.position.z);
  floorBody.quaternion.set(floorMesh.quaternion.x, floorMesh.quaternion.y, floorMesh.quaternion.z, floorMesh.quaternion.w);

  return { floorMesh, floorBody };
}

function createCheckerTexture() {
  const size = 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillRect(1, 1, 1, 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(25, 25);       // quante volte si ripete sul piano
  texture.magFilter = THREE.NearestFilter; // bordi netti, no sfocatura
  return texture;
}