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
import Introduction from "./Introduction"
import Cube from "./Cube"
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
        <div className="flex flex-col flex-grow items-center">
            {/* Some informations about me. */}
            <div className="flex-row flex justify-center">
                <div className="basis-3/5 flex justify-center items-center">
                    <Introduction />
                </div>
                {/* Cube takes 50% and centers its canvas */}
                <div className="basis-2/5 flex justify-center items-center">
                    <Cube imageUrl="lightning-in-a-bottle.jpg" />
                </div>
            </div>
            {/* The summary with some metrics about my experiences. */}
            <Summary/>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////