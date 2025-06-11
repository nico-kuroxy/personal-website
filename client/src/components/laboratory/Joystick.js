/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Joystick component.
//          It is used to render and track the feedback from an on-screen joystick.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useState, useRef, useEffect } from 'react';
// Components
// Context
import { useLaboratory } from "../../context/LaboratoryProvider";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define the component.
export default function Joystick(props) {
    // Destructure the variables passed in the props.
    const { radius = 38, knobRadius = 30, innerKnobRadius = 24} = props
    // Destructure the context.
    const {controller, controllerAxes, setControllerAxes, setJoystickButton} = useLaboratory()
    // Declare the state variables of the component.
    const [isActive, setIsActive] = useState(false)  // Whether or not joystick is being manipulated.
    // Declare the references of the component.
    const baseRef = useRef(null)  // The reference to the base of the joystick.
    const knobRef = useRef(null)  // The reference to the knob of the joystick.
    const innerKnobRef = useRef(null)  // The reference to the inner circle of the knob of the joystick.
    // Declare the function to reset the joystick.
    const resetJoystick = () => {
        // Disable the joystick.
        setIsActive(false)
        // Reset the position of the joystick.
        setControllerAxes([0, 0])
        // Reset the position of the rendered knob.
        knobRef.current.style.transform = `translate(${radius - knobRadius}px, ${radius - knobRadius}px)`
        // Reset the position of the rendered inner knob.
        innerKnobRef.current.style.transform = `translate(${radius - innerKnobRadius}px, ${radius - innerKnobRadius}px)`
    }
    // Declare the function to compute the new position of the joystick based on the user's input.
    const handleMove = (clientX, clientY) => {
        // Retrieve the bounds of the base of joystick.
        const joystickBounds = baseRef.current.getBoundingClientRect()
        // Compute the position of the center of the joystick.
        const centerX = joystickBounds.left + joystickBounds.width / 2
        const centerY = joystickBounds.top + joystickBounds.height / 2
        // Compute the difference between the client's request and the joystick's fixed center.
        let dx = clientX - centerX
        let dy = clientY - centerY
        // Compute the absolute distance to the center.
        const distance = Math.sqrt(dx * dx + dy * dy)
        // If the distance is higher than the delimiting circle, we clamp its value.
        if (distance > radius - knobRadius/2) {
            // Get the angle of the target with arc tangent of the user's input vector.
            const angle = Math.atan2(dy, dx)
            // Clamp the vector.
            dx = Math.cos(angle) * (radius - knobRadius/2) 
            dy = Math.sin(angle) * (radius - knobRadius/2)
        }
        // Update the position of the joystick.
        setControllerAxes([dx / (radius - knobRadius/2)/2, dy / (radius - knobRadius/2)/2])
        // Update the render of the joystick.
        knobRef.current.style.transform = `translate(${dx + radius - knobRadius}px, ${dy + radius - knobRadius}px)`
        innerKnobRef.current.style.transform = `translate(${dx + radius - innerKnobRadius}px, ${dy + radius - innerKnobRadius}px)`
    }
    // Define the function callback triggered when the user touches or clicks on the joystick.
    const startHandler = (event) => {
        // Tells the browser to not run its default behavior for a given event.
        event.preventDefault()
        // Activates the joystick.
        setIsActive(true)
        // Check if the screen was touched.
        if (event.type === 'touchstart') {
            // Move the joystick to the touched position.
            handleMove(event.touches[0].clientX, event.touches[0].clientY)
        } else {
            // Otherwise, move the joystick to the mouse position.
            handleMove(event.clientX, event.clientY)
        }
    }
    // Define the function callback triggered when the user moves the joystick.
    const moveHandler = (event) => {
        // Tells the browser to not run its default behavior for a given event.
        event.preventDefault()
        // Only move the joystick if was previously activated.
        if (isActive) {
        // Check if the screen was touched.
        if (event.type === 'touchmove') {
            // Move the joystick to the touched position.
            handleMove(event.touches[0].clientX, event.touches[0].clientY)
        } else {
            // Otherwise, move the joystick to the mouse position.
            handleMove(event.clientX, event.clientY)
        }
        }
    }
    // Define the function callback triggered when the user releases the joystick.
    const endHandler = (event) => {
        // Reset the joystick.
        resetJoystick()
        // Log the event.
        console.log("endHandler", event)
    }
    // Use an effect hook to to add to the document the event listeners to keep track of the mouse/touch events.
    useEffect(() => {
        // Only keep track of the events when the joystick is active.
        if (!isActive) {
        // Allow the scroll of the page.
        document.body.style.overflow = ''
        return
        }
        // Disable the scroll of the page.
        document.body.style.overflow = 'hidden'
        // Add the event listeners to the page.
        document.addEventListener('mousemove', moveHandler)
        document.addEventListener('mouseup', endHandler)
        document.addEventListener('touchmove', moveHandler)
        document.addEventListener('touchend', endHandler)
        // Properly remove the event listener when the component unmounts.
        return () => {
        // Remove the event listeners.
        document.removeEventListener('mousemove', moveHandler)
        document.removeEventListener('mouseup', endHandler)
        document.removeEventListener('touchmove', moveHandler)
        document.removeEventListener('touchend', endHandler)
        }
    }, [isActive])
    // Return the html component.
    return (
        // The container of the whole Joystick component.
        <div className='absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center m-5 space-x-5'>
            {!controller && (
            <>
                { /* The container of the base of the joystick */ }
                <div ref={baseRef} className="relative rounded-full bg-gray-300 border border-black active:shadow-none shadow-2xl transition-shadow duration-200" style={{ width: radius * 2, height: radius *2 }}>
                    { /* The container of the knob of the joystick */ }
                    <div ref={knobRef} onMouseDown={startHandler} onTouchStart={startHandler} 
                        className={`absolute rounded-full transition-all ${isActive ? 'scale-150 bg-blue-500' : ' scale-100'}`}
                        style={{width: knobRadius * 2, height: knobRadius * 2, transform: `translate(${radius - knobRadius}px, ${radius - knobRadius}px)`}}
                    />
                    { /* The container of the inner knob of the joystick */ }
                    <div ref={innerKnobRef} onMouseDown={startHandler} onTouchStart={startHandler} 
                        className={`absolute rounded-full bg-transparent transition-all ${isActive ? 'border-[2px] border-yellow-500 scale-150' : 'border-blue-500 scale-100 border-[4px]'}`}
                        style={{width: innerKnobRadius * 2, height: innerKnobRadius * 2, willChange: 'transform', transform: `translate(${radius - innerKnobRadius}px, ${radius - innerKnobRadius}px)`}}
                    />
                </div>
                { /* The container of the reset button of the joystick */ }
                <button className='text-5xl font-serialCustom text-blue-500 bg-gray-300 border border-black p-2 rounded-md active:text-yellow-500 hover:bg-blue-500 hover:text-white active:shadow-none shadow-2xl transition-shadow duration-200'
                    onClick={ () => setJoystickButton(true)}>
                    Reset
                </button>
            </>
            )}
        </div>
    )
}