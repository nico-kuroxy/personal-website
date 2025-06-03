/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the GameController react component.
//          It is used to handle any game controller connected to the client.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useEffect, useRef, useState } from 'react';
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function GameController(props) {
    // Destructure the variables passed as arguments.
    const {} = props
    // Destructure the context.
    const {controller, setController, controllerButtons, setControllerButtons, controllerAxes, setControllerAxes} = useLaboratory()
    // Declare component variables.
    const gamepadIndex = useRef(null) // A reference to the index of the last connected gamepad.
    const animationFrameRef = useRef(null) // A reference to the current animation frame of the browser.
    // Create a loop that is updated in synch with the browser's framerate.
    const pollGamepad = () => {
        // Retrieve every connected gamepads.
        const gamepads = navigator.getGamepads()
        // Focus on the last one that was connected.
        const gamepad = gamepads[gamepadIndex.current]
        // If there are any, iterate through each button.
        if (gamepad) {
          // Set whether or not each button is pressed.
          setControllerButtons(gamepad.buttons.map((b) => b.pressed))
          // Set the values for each axis.
          setControllerAxes([...gamepad.axes]);
        }
        // Request a call to the same function during the next animation frame (effectively creating the loop effect).
        requestAnimationFrame(pollGamepad)
    }
    // Callback function called when a controller is connected.
    const connectControllerHandler = (e) => {
        // Log the info about the connected gamepad.
        console.log('Gamepad connected:', e.gamepad);
        // Register the index of the latest connected gamepad.
        gamepadIndex.current = e.gamepad.index;
        // Set the lab context's controller value to true.
        setController(true)
        // Start the monitoring loop checking for the gamepad's update in sync with the browser's framerate.
        pollGamepad()
      }
    // Callback function that will trigger everytime a gamepad is diconnected.
    const disconnectControllerHandler = (e) => {
        // Log the info about the disconnected gamepad.
        console.log('Gamepad disconnected:', e.gamepad)
        // Set the lab context's controller value to false.
        setController(false)
        // Remove the monitoring loop checking for the gamepad's update in sync with the browser's framerate.
        cancelAnimationFrame(animationFrameRef.current)
    }
    // useEffect() hook are usually defined last in the component declaration. This one is loaded once upon the component's initialization.
    useEffect(() => {
      // Add a callback for when a gamepad is connected.
      window.addEventListener('gamepadconnected', connectControllerHandler)
      // Add callback for when a gamepad is disconned.
      window.addEventListener('gamepaddisconnected', disconnectControllerHandler)
      // When the component is de-rendered, we cleanly disconnect the event callback.
      return () => {
        // Remove callback for when a gamepad is connected.
        window.removeEventListener('gamepadconnected', connectControllerHandler)
        // Remove callback for when a gamepad is connected.
        window.removeEventListener('gamepaddisconnected', disconnectControllerHandler)
        // Remove the monitoring loop checking for the gamepad's update in sync with the browser's framerate.
        cancelAnimationFrame(animationFrameRef.current)
      }
    }, []) 
    // Return the html.
    return (
      // The container of the GameController buttons component.
      <div className="absolute inset-0 p-4 font-monoCustom">
        {controller && (
          <div className="flex flex-col w-6">
            {controllerButtons.map((pressed, idx) => (
              <span key={idx} className={`w-6 text-center rounded ${pressed ? 'bg-green-400 text-white' : 'bg-gray-400'}`}>
                {idx}
              </span>
            ))}
          </div>
        )}
      </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////