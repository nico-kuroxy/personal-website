/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Introduction react component.
//          It is used to organize the text introducing me..
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
// Components.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Introduction(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole Introduction component.
        <div className="flex justify-center flex-grow items-center">
            <div className="flex flex-col items-start text-left max-w-3xl space-y-4">
                {/* My name. */}
                <span className="flex text-4xl">My name is Nicolas Erbetti</span>
                {/* My profession. */}
                <div className="text-6xl font-monoCustom">
                    <p>Robotics Engineer /</p>
                    <p>Subspecialities</p>
                </div>
                {/* What I do. */}
                <div className="w-full text-2xl">
                    <p>I delve deep into the system interfaces between software and hardware components to provide robust solutions to complex robotic problems.</p>
                    <p>My goal ? Contributing to building a better future for all.</p>
                </div>
            </div>
        </div>

    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////