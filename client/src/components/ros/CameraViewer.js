'use client';

import React, { useEffect, useState, useRef } from 'react';
import ROSLIB from 'roslib';

const CameraViewer = () => {
  const [imageSrc, setImageSrc] = useState('');
  const joystickRef = useRef(null);
  const rosRef = useRef(null);
  const cmdVelPubRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      // Use wss (web socket secure) instead of simple ws (websocket) to guarantee safety and be compatible with most browsers.
      // This requires the connection with the server to be configured accordingly.
      url: 'wss://192.168.1.16:9090',
    });
    ros.on('connection', () => {
      console.log('Connected to ROSBridge!');
    });
  
    ros.on('error', (error) => {
      console.error('Error connecting to ROSBridge:', error);
    });
  
    ros.on('close', () => {
      console.warn('Connection to ROSBridge closed.');
    });
    rosRef.current = ros;

    const imageSub = new ROSLIB.Topic({
      ros,
      name: 'camera/image_raw/compressed',
      messageType: 'sensor_msgs/CompressedImage',
    });

    imageSub.subscribe((message) => {
      setImageSrc(`data:image/jpeg;base64,${message.data}`);
    });

    const cmdVelPub = new ROSLIB.Topic({
      ros,
      name: 'cmd_vel',
      messageType: 'geometry_msgs/Twist',
    });
    cmdVelPubRef.current = cmdVelPub;

    return () => {
      imageSub.unsubscribe();
      ros.close();
    };
  }, []);

  const updatePosition = (clientX, clientY) => {
    const rect = joystickRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const normalizedX = (x - rect.width / 2) / (rect.width / 2);
    const normalizedY = (rect.height / 2 - y) / (rect.height / 2);

    const boundedX = Math.max(-1, Math.min(1, normalizedX));
    const boundedY = Math.max(-1, Math.min(1, normalizedY));

    setPosition({ x: boundedX, y: boundedY });
  };

  // Mouse handlers
  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    updatePosition(event.clientX, event.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        updatePosition(event.clientX, event.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch handlers
  const handleTouchStart = (event) => {
    event.preventDefault();
    setIsDragging(true);
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    if (isDragging && event.touches.length > 0) {
      const touch = event.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  // Publish Twist message whenever position changes
  useEffect(() => {
    if (!cmdVelPubRef.current) return;

    const twistMsg = new ROSLIB.Message({
      linear: {
        x: position.y * 1.0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -position.x * 1.0,
      },
    });

    cmdVelPubRef.current.publish(twistMsg);
  }, [position]);

  return (
    <div className="flex-shrink-0 w-80 h-60 bg-black p-2">
      <div
        ref={joystickRef}
        className="relative w-32 h-32 rounded-full bg-gray-200 select-none touch-none mx-auto"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <div
          className="absolute w-6 h-6 rounded-full bg-blue-500"
          style={{
            left: `${50 + position.x * 50}%`,
            top: `${50 - position.y * 50}%`,
            transform: 'translate(-50%, -50%)',
            transition: isDragging ? 'none' : 'left 0.2s, top 0.2s',
          }}
        />
      </div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Video Stream"
          className="object-cover w-full h-full mt-2 rounded-md"
        />
      )}
    </div>
  );
};

export default CameraViewer;
