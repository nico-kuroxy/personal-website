/**********************************************************************************************************************/
//   brief: This file defines the Hero react context.
//          It is used to share accross the components all functions and variables pertaining to the hero / main page.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useState, useRef, useEffect, useContext, createContext } from 'react'
// Components
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> CONTEXT 
// Context creation.
const HeroProviderContext = createContext()
// Context declaration.
export function useHero() { return useContext(HeroProviderContext) }
// Context provider.
export function HeroProvider(props) {
    // Destructure the props.
    const { children } = props
    // Define state variables.
    const [robot, setRobot] = useState(null)
    // Define references.
    // Variables and functions that need to be accessed through this context.
    const value = { robot, setRobot }
    // Return the html.
    return (
        <HeroProviderContext.Provider value={value}>
            {children}
        </HeroProviderContext.Provider>
    )
}