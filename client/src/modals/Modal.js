"use client";

/**********************************************************************************************************************/
//   author: : Nicolas Erbetti
//   brief: This file defines the base Modal react component.
//          It is used to render the windows overlaying the application.
/**********************************************************************************************************************/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT

// Function declaration.
export default function Modal(props) {
  // Destructure the props.
  const {name, children, handleCloseModal} = props
  // Initialize the variables.
  const [mounted, setMounted] = useState(false);
  // Use an effect hook to make sure that the portal is only created on the client side.
  useEffect(() => {
    setMounted(true);
  }, []);
  // Return directly if the component is not mounted.
  if (!mounted) return null;
  // Otherwise, try to create the portal.
  const portal = document.getElementById("portal");
  if (!portal) return null;
  // Return the jsx html.
  return ReactDom.createPortal(
        <div className="modal-container">
            <button 
                onClick={handleCloseModal}
                className="modal-underlay"/>
            <div className="modal-content">
            <div>
                {/* Title of the modal. */}
                <h2 className='font-monoCustom font-bold text-2xl lg:text-2xl'>{name}</h2>
                <p> Here, you can play with some robots that are being simulated server-side in Gazebo.  </p>
                <p> Everything runs on ROS2, open-source packages and custom JS/C++ code. </p>
            </div>
            {children}
        </div>
    </div>,
    document.getElementById("portal")
  )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////