import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';


function WobblingCube({ imageBackUrl, imageFrontUrl }) {
  const cubeRef = useRef();
  const texture_front = useLoader(THREE.TextureLoader, imageFrontUrl);
  const texture_back = useLoader(THREE.TextureLoader, imageBackUrl);

  // Create six materials (one for each face)
  const materials = [
    new THREE.MeshBasicMaterial({ color: '#1314EC' }),  // right
    new THREE.MeshBasicMaterial({ color: '#2F2' }),  // left
    new THREE.MeshBasicMaterial({ color: '#F22' }),  // top
    new THREE.MeshBasicMaterial({ color: '#FFF' }),  // bottom
    new THREE.MeshBasicMaterial({ map: texture_front }),   // front (facing camera)
    new THREE.MeshBasicMaterial({ map: texture_back }),  // back
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

export default function Cube(props) {
  const {imageFrontUrl, imageBackUrl} = props
  return (
    <Canvas style={{ width: '100%', height: '75vh', background: 'transparent' }}>
      {/* Position the camera to look directly at the origin */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <WobblingCube imageFrontUrl={imageFrontUrl} imageBackUrl={imageBackUrl} />
      {/* Allow mouse rotation but disable zoom and pan. */}
      <OrbitControls enableZoom={false} enablePan={false}/>
    </Canvas>
  );
}
