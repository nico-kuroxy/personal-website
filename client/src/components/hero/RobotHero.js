/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the RobotHero react component.
//          It is used to organize the robot content of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
// Components.
import RobotCarousel from "./RobotCarousel"
import RobotDeck from "./RobotDeck"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function RobotHero(props) {
    // Destructure the variables passed as argument.
    const {targetSecondScreenRef, hasScrolled} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole RobotHero component.
        <div className="flex flex-row min-h-screen w-2/3 items-center justify-center">
            {/* Left half: Carousel */}
                <div className="flex flex-col -ml-10 w-[40%] items-center justify-center">
                {/* The carousel with the pictures of the robots I worked on. */}
                <RobotCarousel/>
            </div>
            {/* Right half: Card deck */}
            <div className="flex flex-col w-[60%] items-center justify-center">
                {/* The deck of cards with some information about the robots I worked on. */}
                <RobotDeck/>
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////