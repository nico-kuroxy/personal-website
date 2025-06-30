/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ModalLaboratoryHelp react component.
//          It is used to render the content of the help section overlaying the application.
/**********************************************************************************************************************/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import ReactDom from "react-dom"
import { useState } from "react"
// Context
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT

// Function declaration.
export default function ModalLaboratoryHelp(props) {

    // Destructure the props
    const { onButtonClick, handleCloseModal } = props

    // Destructure the context.

    // Use state variables.

    // Return the jsx html.
    return (
    <>
      <div class="guide-container p-4 space-y-2 text-base leading-relaxed">
        { /* <!-- Simulation Section --> */}
        <div class="section py-3">
          <h2 class="font-monoCustom text-xl font-bold">🖥️ Simulation</h2>
          <p>To select a world to explore, click on <strong>load world</strong>.</p>
          <p>To select a robot to operate, click on <strong>load robot</strong>.</p>
          <p>To connect your joystick, click on <strong>connect joystick</strong>.</p>
          <p>Once your choice is done, or if you changed anything, click on <strong>apply choice</strong>.</p>
        </div>

        { /* <!-- Operation Section --> */}
        <div class="section py-3">
          <h2 class="font-monoCustom text-xl font-bold">🎮 Operation</h2>
          <p>To operate the robot, play with the joysticks displayed in the main frame.</p>
          <p>If you connected a controller to your device, you can also use it.</p>
        </div>

        { /* <!-- Visualization Section --> */}
        <div class="section py-3">
          <h2 class="font-monoCustom text-xl font-bold">📈 Visualization</h2>
          <p>If you click on one of the secondary frames on the right, you can switch the view of the main frame.</p>
          <p>You can use <strong>orbit control</strong> to rotate around and zoom on the virtual twin.</p>
          <p>If you click on one component, it will display information relative to it in the virtual twin canvas.</p>
          <p>You can switch between the <strong>virtual twin view</strong>, the <strong>raw data view</strong>, and the <strong>plot view</strong> with the buttons in the canvas.</p>
        </div>
      </div>
    </>
  )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////