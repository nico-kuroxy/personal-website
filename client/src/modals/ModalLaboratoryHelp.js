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
      <div className="px-4 pb-6 space-y-2 text-base dark:text-white text-blue-900 leading-relaxed">
        { /* <!-- Simulation Section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">🖥️ Simulation</h2>
        <ul className="ml-6 list-disc list-inside text-xl space-y-1">
          <li>The <strong>ROS connection</strong> lightbulb is <span className="text-green-500">green</span> if the rosbridge websocket has connected, <span className="text-red-500">red</span> otherwise.</li>
          <li>The <strong>Controller connection</strong> lightbulb is <span className="text-green-500">green</span> if a game controller is connected, <span className="text-red-500">red</span> otherwise.</li>
          <li>You can switch the camera feed by clicking on <strong>"robot view"</strong> and <strong>"aerial view"</strong>.</li>
          <li>The <strong>"apply choice"</strong> button is still WIP.</li>
        </ul>

        { /* <!-- Operation Section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">🎮 Operation</h2>
        <ul className="ml-6 list-disc list-inside text-xl space-y-1">
          <li>To operate the robot, play with the <strong>joystick displayed</strong> in the main frame.</li>
          <li>You can reset the position of the robot in the world by pressing <strong>"reset"</strong>.</li>
          <li>If you connected a controller to your device, you can also use it.</li>
        </ul>

        { /* <!-- Visualization Section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">📈 Visualization</h2>
        <ul className="ml-6 list-disc list-inside text-xl space-y-1">
          <li>You can pan the data graph by left clicking + holding it, pause it, and reset it to the default view.</li>
          <li>You can rescale the temporal axis by scrolling on the graph.</li>
          <li>Hovering your mouse over the graph will display the numerical values of each point.</li>
          <li>You can use <strong>orbit control</strong> to rotate around and zoom on the virtual twin.</li>
          <li>You can switch the data stream by clicking on <strong>"focus on:"</strong>.</li>
        </ul>

      </div>
    </>
  )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////