/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Summary react component.
//          It is used to display the main informations about my work.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Summary(props) {
    // Destructure the variables passed as argument.
    const {targetSecondScreenRef, hasScrolled} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
     // Return the html.
     return (
        // The container of the whole summary component.
        <div className="flex flex-row justify-center space-x-6 text-4xl">
            {/* Number of years of experience. */}
            <span className="px-2 font-bold text-orange-500">3+</span>years of experience
            {/* Number of countries I worked in. */}
            <span className="w-px bg-yellow-500"></span>
            <span className="pr-2 font-bold text-orange-500">3</span> countries worked in
            {/* Number of robot I worked on, goes to the robot carousel section when clicked on. */}
            <span className="w-px bg-yellow-500"></span>
            <button onClick={() => {hasScrolled.current = true; targetSecondScreenRef.current?.scrollIntoView({ behavior: "smooth" }); setTimeout(() => { hasScrolled.current = false }, 100);}}>
                <span className="pr-2 font-bold text-orange-500">6</span>robots developped
            </button>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////