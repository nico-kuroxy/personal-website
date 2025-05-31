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
import ConversionButtons from "./ConversionButtons"
import Typewriter from "./Typewriter"
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
        <div className="flex justify-center flex-grow items-center pl-20">
            <div className="flex flex-col items-start text-left max-w-3xl space-y-5">
                {/* My name. */}
                <span className="flex text-4xl">My name is Nicolas Erbetti</span>
                {/* My profession. */}
                <div className="text-6xl font-monoCustom">
                    <p>Robotics Engineer </p>
                    <Typewriter words={["AI [=◉︿◉=]", "Machine Learning", "Autonomous Stack", "Mobile Robots", "Robotic Arms", "Space Systems", "Computer Vision", "AUV & ASV", "Web Development"]} speed={100} pause={1250} />
                </div>
                {/* What I do. */}
                <div className="max-w-2xl text-2xl">
                    <p>I use cutting-edge technologies and algorithms to provide robust solutions to complex robotic problems.</p>
                    <p>My goal ? Contributing to building a better future for all.</p>
                </div>
                {/* The buttons I want the user to click. */}
                <ConversionButtons/>
            </div>
        </div>

    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////