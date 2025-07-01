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
        <div className="flex flex-col modal-container">
            {/* Button to close the modal. */}
            <button 
                onClick={handleCloseModal}
                className="modal-underlay"/>
            {/* Modal content itself. */}
            <div className="flex flex-col w-full modal-content">
                {/* Title of the modal. */}
                <h2 className='py-3 font-monoCustom font-bold text-4xl lg:text-4xl'>{name}</h2>
                {/* Subtitle of the modal. */}
                <div> Here, you can play with some robots that are being simulated in Gazebo on a remote server.  </div>
                <div> Everything runs on ROS2, open-source packages and custom JS/C++ code. </div>
                {/* Vertical bar */}
                <div className="h-1 my-5 bg-yellow-500 w-1/5"></div>
                {/* Children of the modal. */}
                {children}
        </div>
    </div>,
    document.getElementById("portal")
  )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////