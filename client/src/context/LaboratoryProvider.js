/**********************************************************************************************************************/
//   brief: This file defines the Laboratory react context.
//          It is used to share accross the components all functions and variables pertaining to the laboratory.
//          This includes but is not limited to, the choice of world, robot, and state of any eventual game controller.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useState, useEffect, useContext, createContext } from 'react'
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
    // Use state variables.
    const [ controller, setController ] = useState(false) // Which controller is connected to the app.
    const [ controllerButtons, setControllerButtons] = useState([]) // The state of each button of the latest controller connected to the app.
    const [ controllerAxes, setControllerAxes] = useState([]) // The state of each axis of the latest controller connected to the app.
    // Variables and functions that need to be accessed through this context.
    const value = { controller, setController, controllerButtons, setControllerButtons, controllerAxes, setControllerAxes };
    // Return the html.
    return (
        <LaboratoryProviderContext.Provider value={value}>
            {children}
        </LaboratoryProviderContext.Provider>
    )
}