"use client";

import React from "react";
import { Canvas, useFrame  } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { scalePosition } from "../utils/maths";


const ClientCanvas = () => {
  const [solarData, setSolarData] = useState([]);


  useEffect(() => {
    // Fetch positions for planets
    const fetchPositions = async () => {
      const objects = [199, 399] //["Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
      const results = await Promise.all(objects.map(obj => axios.get(`http://localhost:4000/api/position/${obj}`)));
      setSolarData(results.map(res => res.data)); // Process response
    };

    fetchPositions();
  }, []);

  console.log("Solar data", solarData)
  let flattenedData = []
  if (solarData) {
    flattenedData = [
      solarData[0]?.data[0],
      solarData[0]?.data[1],
      solarData[1]?.data[0],
      solarData[1]?.data[1],
    ]
  }
  console.log("Solar data flat", flattenedData)

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      testzé
      <Canvas camera={{ position: [-500, 0, 500], fov: 50 }}>
        testé
        {flattenedData.map((obj, idx) => (
          <mesh  key={idx} position={[scalePosition(obj?.X, 10) || 0, scalePosition(obj?.Y, 10) || 0, scalePosition(obj?.Z, 10) || 0]}>
            <sphereGeometry args={[25, 32, 32]} />
            <meshStandardMaterial wireframe  color="green" />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}

export default ClientCanvas;