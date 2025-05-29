import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

function WobblingCube({ imageUrl }) {
  const cubeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  // Create six materials (one for each face)
  const materials = [
    new THREE.MeshBasicMaterial({ color: '#FFF' }),  // right
    new THREE.MeshBasicMaterial({ color: '#222' }),  // left
    new THREE.MeshBasicMaterial({ color: '#222' }),  // top
    new THREE.MeshBasicMaterial({ color: '#222' }),  // bottom
    new THREE.MeshBasicMaterial({ map: texture }),   // front (facing camera)
    new THREE.MeshBasicMaterial({ color: '#222' }),  // back
  ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    cubeRef.current.rotation.x = Math.sin(t*1)*0.05; // wobble
    cubeRef.current.rotation.z = Math.sin(t*1)*0.05; // wobble
    cubeRef.current.rotation.y = Math.sin(t*1)*0.05 -0.353; // wobble
  });

  return (
    <mesh ref={cubeRef} scale={3} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default function Pyramid(props) {
  const {imageUrl} = props
  return (
    <Canvas style={{ width: '75%', height: '75vh', background: 'transparent' }}>
      <ambientLight />
      <WobblingCube imageUrl={imageUrl} />
    </Canvas>
  );
}
