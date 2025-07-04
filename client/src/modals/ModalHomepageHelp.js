/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ModalHomepageHelp react component.
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
export default function ModalHomepageHelp(props) {

    // Destructure the props
    const { onButtonClick, handleCloseModal } = props

    // Destructure the context.

    // Use state variables.

    // Return the jsx html.
    return (
    <>
      <div className="px-4 pb-6 space-y-2 text-base leading-relaxed">
        { /* <!-- About me section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">👨‍💻 About me</h2>
        <ul className="ml-6 list-disc list-inside dark:text-white text-blue-900 text-xl space-y-1">
          <li>The <strong>"contact me"</strong> button opens your mail application with my pre-filled address.</li>
          <li>The <strong>"download CV"</strong> button downloads a PDF of my CV on your device.</li>
          <li>The <strong>"visit the lab"</strong> button routes your browser to my online ROS2 laboratory.</li>
          <li>The <strong>3D medalion</strong> is orbitable if you left-lick and drag on it.</li>
          <li>Clicking on the <strong>number of developped robot</strong> will transfer you to the <strong>robot carousel</strong> section of the page.</li>
          <li>Furthermore, the page automatically scrolls down to the <strong>robot carousel</strong> when you use your mouse wheel.</li>
        </ul>

        { /* <!-- Robotic section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">🎠 Robot carousel</h2>
        <ul className="ml-6 list-disc list-inside dark:text-white text-blue-900 text-xl space-y-1">
          <li>The <span className="dark:text-yellow-500 text-yellow-300">left</span> and <span className="dark:text-yellow-500 text-yellow-300">right</span> arrow buttons rotate the robot in the carousel.</li>
          <li>You can also go to a specific robot by clicking on its displayed <strong>picture</strong>.</li>
          <li>The <span className="dark:text-orange-500 text-orange-300">robot card</span> opens a tab with the commercial description of the selected robot.</li>
          <li>The <strong>media card</strong> contains a youtube video player with a small demo of the robot.</li>
          <li>The <strong>hardware card</strong> contains a short description of the sensors equipping the robot.</li>
          <li>The <strong>missions card</strong> contains a non-exhaustive list of the robot's features.</li>
          <li>You can <strong>shift cards</strong> by clicking on it.</li>
          <li>Finally, the page automatically scrolls up to the <strong>about me section</strong> when you use your mouse wheel.</li>
        </ul>

      </div>
    </>
  )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////