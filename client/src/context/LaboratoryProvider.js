/**********************************************************************************************************************/
//   brief: This file defines the Laboratory react context.
//          It is used to share accross the components all functions and variables pertaining to the laboratory.
//          This includes but is not limited to, the choice of world, robot, and state of any eventual game controller.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { Group } from 'three';
// Components
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> CONTEXT 
// Context creation.
const LaboratoryProviderContext = createContext()
// Context declaration.
export function useLaboratory() { return useContext(LaboratoryProviderContext) }
// Context provider.
export function LaboratoryProvider(props) {
    // Destructure the props.
    const { children } = props
    // Define state variables.
    const [ ros, setRos ] = useState(false) // The ros handler object.
    const [ urdfPath, setUrdfPath ] = useState("/robots/turtlebot/urdf/turtlebot3_burger_cam.urdf") // The path to the urdf file describing the robot.
    const [ robotModel, setRobotModel ] = useState(Group | null) // The three 3d model of the chosen robot.
    const [ monitorRobotSrc, setMonitorRobotSrc] = useState('') // The latest image retrieved from the robot's camera.
    const [ controller, setController ] = useState(false) // Which controller is connected to the app.
    const [ controllerButtons, setControllerButtons] = useState([]) // The state of each button of the latest controller connected to the app.
    const [ controllerAxes, setControllerAxes] = useState([]) // The state of each axis of the latest controller connected to the app.
    // Define references.
    const robotOrientationRef = useRef(null) // The reference of the robotOrientation retrieved over the rosbridge.
    const jointStatesRef = useRef({}) // The reference of the jointStates retrieved over the rosbridge.
    // Variables and functions that need to be accessed through this context.
    const value = { controller, setController, controllerButtons, setControllerButtons, controllerAxes, setControllerAxes, ros, setRos, monitorRobotSrc, setMonitorRobotSrc, urdfPath, setUrdfPath, robotModel, setRobotModel, jointStatesRef, robotOrientationRef }
    // Return the html.
    return (
        <LaboratoryProviderContext.Provider value={value}>
            {children}
        </LaboratoryProviderContext.Provider>
    )
}