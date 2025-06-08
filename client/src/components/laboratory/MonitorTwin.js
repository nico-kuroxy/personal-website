/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorTwin react component.
//          It is used to display a 3d model of the selected robot.
//          It leverages the urdf loaders javascript package for which integration examples are provided here : 
//          https://github.com/gkjohnson/urdf-loaders/tree/master/javascript. 
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useEffect } from 'react';
import { LoadingManager } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import URDFLoader from 'urdf-loader';
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function MonitorTwin(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const { urdfPath, robotModel, setRobotModel, jointStatesRef, robotOrientationRef } = useLaboratory()
    // Define the callback function for the loader.
    const onLoad = (robot) => {
        // Make the robot upright.
        robot.rotation.x = -Math.PI/2
        // Save to context.
        setRobotModel(robot)
        // Log it.
        console.log("Loaded robot model:", urdfPath)
    }
    const onProgress = (xhr) => {
        // Return immediately if the XMLHttpRequest does not exist.
        if (!xhr) return
        // Otherwise, compute the loading percentage.
        const percent = (xhr.loaded / xhr.total) * 100
        // Log the information.
        console.log(`Loading: ${percent.toFixed(2)}%`)
    }
    const onError = (error) => {
        // Log the error.
        console.error("Failed to load URDF:", error)
    }
    // Animate joints and wheels using the useFrame() hook to update the robot's pose at every frame render of the browser.
    useFrame(() => {
        // Check if the robot model is loaded.
        if (robotModel) {
            // Iterating over every child of the urdf of the robot.
            robotModel.traverse((child) => {
                // To find each joint and apply them the latest angle retrieved over the network.
                if (child.isURDFJoint) { child.setJointValue(jointStatesRef.current[child.name] || 0) }
            })
            // Check if the robot has an orientation...
            if (robotOrientationRef.current) {
                // And update its pose in the 3d canvas based on its odometry...
                const { x, y, z } = robotOrientationRef.current
                robotModel.rotation.set(x - Math.PI/2, y, z)
            }
        }
    })
    // Load URDF upon loading the component, and whenever the urdf path changes.
    useEffect(() => {
        // Safeguard : check if path is defined.
        if (!urdfPath) { console.error("No path has been defined for the urdf of the robot."); return }
        // Create the urder loader and manager.
        const manager = new LoadingManager()
        const loader = new URDFLoader(manager)
        // Loading the robot model. The function takes four arguments : the path to the model, a callback to the onLoad Function, a callback to the onProgress function, and a callback to the onError function.
        loader.load( urdfPath, onLoad, onProgress, onError )
    }, [urdfPath])
    // Return the html.
    return (
        // The container of the whole MonitorRobot component, with the slide-in animation.
        <>
            {/*Set up a camera to view the model. */}
            <PerspectiveCamera makeDefault position={[0.23, 0.125, 0.23]} />
            {/*Set up an homogeneous light. */}
            <ambientLight intensity={0.1} />
            {/* Set up a directionnal light. */}
            <directionalLight position={[5, 5, -5]} intensity={1} />
            {/* Enable orbit control while disabling panning and originally looking at the center of the robot. */}
            <OrbitControls enablePan={false} target={[0, 0.1, 0]}/>
            {/* Display a 4x4 1m-squared XZ grid to showcase the robot's relative position to the ground. Y is a little below 0 to avoid "y-fighting" or blickering. */}
            <gridHelper args={[1, 4, '#88ffff', '#cccccc']} position={[0, 0.0001, 0]} />
            {/* Conditionnal rendering to display the actual robot model if it exists. */}
            {robotModel && <primitive object={robotModel} />}
        </>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////