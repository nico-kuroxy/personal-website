/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Hero react component.
//          It is used to organize the main content of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
// Components.
import Cube from "./Cube"
import Introduction from "./Introduction"
import Summary from "./Summary"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Hero(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole Hero component.
        <div className="flex flex-col mb-20 flex-grow items-center justify-center">
            <div className="flex-row flex justify-center">
                {/* Personal infos take 2/3 and center in its container. */}
                <div className="flex-col basis-3/5 flex justify-center items-center">
                    {/* Some informations about me. */}
                    <Introduction/>
                </div>
                {/* Cube takes 1/3 and centers its canvas */}
                <div className="basis-2/5 flex justify-center items-center">
                    {/* Interactible cube with my picture and a little easter egg */}
                    <Cube imageFrontUrl="lightning-in-a-bottle.jpg" imageBackUrl="jinx.jpg" />
                </div>
            </div>
            {/* The summary with some metrics about my experiences. */}
            <Summary/>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////