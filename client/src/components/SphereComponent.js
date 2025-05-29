"use client";

import React from "react";
import { Canvas, useFrame  } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";

export default SphereComponent = ({ position }) => {
    const sphereRef = useRef();
    const [rotationSpeed] = useState(0.01); // Adjust rotation speed as needed
  
    // Update rotation in each frame
    useFrame(() => {
      if (sphereRef.current) {
        sphereRef.current.rotation.x += rotationSpeed;
        sphereRef.current.rotation.y += rotationSpeed;
      }
    });
  
    // Update rotation in each frame
    useFrame(() => {
      if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.01;
        sphereRef.current.rotation.y += 0.01;
      }
    });
  
    return (
      <mesh ref={sphereRef} position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="green" wireframe />
      </mesh>
    );
  };