import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera, Edges } from '@react-three/drei';
import { RoundedBox } from '@react-three/drei';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Custom shader material for rounded corner masking
const RoundedCornerMaterial = shaderMaterial(
  // Uniforms
  {
    map: null,
    radius: 0.5, // corner radius in UV space (0 to 0.5)
  },
  // Vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  // Fragment shader with stronger crop and margin
  ` uniform sampler2D map;
    uniform float radius;
    varying vec2 vUv;

    float roundedRect(vec2 uv, float r) {
      // Add margin to crop image more inside
      float margin = 0.05; // increase this to crop more
      uv = uv * (1.0 - 2.0 * margin) + vec2(margin); // scale UV towards center

      uv = uv * 2.0 - 1.0; // map uv from [0,1] to [-1,1]
      vec2 absUv = abs(uv);
      vec2 corner = absUv - vec2(1.0 - r);
      float inside = step(max(corner.x, corner.y), 0.0);
      float dist = length(max(corner, 0.0));
      float smoothEdge = smoothstep(r, r - 0.01, dist);
      return inside + (1.0 - inside) * (1.0 - smoothEdge);
    }

    void main() {
      float mask = roundedRect(vUv, radius);
      vec4 color = texture2D(map, vUv);
      if (mask < 0.01) discard;
      gl_FragColor = color;
    }
  `
);

extend({ RoundedCornerMaterial });

function Medallion({ imageFrontUrl, imageBackUrl }) {
  const medallionRef = useRef();
  const textureFront = useLoader(THREE.TextureLoader, imageFrontUrl);
  const textureBack = useLoader(THREE.TextureLoader, imageBackUrl);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    medallionRef.current.rotation.x = Math.sin(t) * 0.05;
    medallionRef.current.rotation.z = Math.sin(t) * 0.05;
    medallionRef.current.rotation.y = Math.sin(t) * 0.05 - 0.353;
  });

  // Medallion dimensions
  const width = 1.5;
  const height = 1.5;
  const depth = 0.12; // keep depth slightly larger than radius * 2

  // Corner radius smaller than half thickness
  const radius = 0.05;

  // Plane size matches medallion face exactly
  const planeWidth = width;
  const planeHeight = height;

  return (
    <group ref={medallionRef} scale={3}>
      {/* Rounded medallion shape */}
      <RoundedBox
        args={[width, height, depth]}
        radius={radius}
        smoothness={4}
      >
        <meshStandardMaterial color="#0a4cff" />
        <Edges scale={1} threshold={15} color="blue" />
      </RoundedBox>

      {/* Front plane with rounded corner masked shader */}
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <roundedCornerMaterial
          map={textureFront}
          radius={radius / (width / 5)} // Convert radius to UV space (radius / half width)
          toneMapped={false}
          transparent={true}
        />
      </mesh>

      {/* Back plane with flipped texture and rounded mask */}
      <mesh
        position={[0, 0, -depth / 2 - 0.001]}
        rotation={[0, Math.PI, 0]}
        scale={[-1, 1, 1]} // Flip horizontally
      >
        <planeGeometry args={[planeWidth, planeHeight]} />
        <roundedCornerMaterial
          map={textureBack}
          radius={radius / (width / 5)}
          toneMapped={false}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

export default function Cube({ imageFrontUrl, imageBackUrl }) {
  return (
    <Canvas style={{ width: '100%', height: '75vh', background: 'transparent' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.76} />
      <directionalLight position={[5, 5, 5]} intensity={0.75} />
      <Medallion imageFrontUrl={imageFrontUrl} imageBackUrl={imageBackUrl} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
