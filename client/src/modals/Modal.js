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
  const {name, subtitles, children, handleCloseModal} = props
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
            <div className="flex flex-col w-full dark:text-white text-blue-900 modal-content dark:bg-blue-600/70 bg-blue-300 dark:border-blue-500 border border-blue-500">
                {/* Title of the modal. */}
                <h2 className='py-3 font-monoCustom font-bold text-4xl lg:text-4xl'>{name}</h2>
                {/* Subtitle of the modal. */}
                {subtitles.map((text, idx) => (
                  <div key={idx}>{text}</div>
                ))}
                {/* Vertical bar */}
                <div className="h-1 my-5 dark:bg-yellow-500 bg-yellow-300 w-1/5"></div>
                {/* Children of the modal. */}
                {children}
        </div>
    </div>,
    document.getElementById("portal")
  )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////