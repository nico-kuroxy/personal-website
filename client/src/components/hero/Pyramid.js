import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';


function WobblingCube({ imageUrl }) {
  const cubeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  // Create six materials (one for each face)
  const materials = [
    new THREE.MeshBasicMaterial({ color: '#FFF' }),  // right
    new THREE.MeshBasicMaterial({ color: '#2F2' }),  // left
    new THREE.MeshBasicMaterial({ color: '#F22' }),  // top
    new THREE.MeshBasicMaterial({ color: '#22F' }),  // bottom
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
    <Canvas style={{ width: '100%', height: '75vh', background: 'transparent' }}>
      {/* Position the camera to look directly at the origin */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <WobblingCube imageUrl={imageUrl} />
      {/* Allow mouse rotation but disable zoom and pan. */}
      <OrbitControls enableZoom={false} enablePan={false}/>
    </Canvas>
  );
}
