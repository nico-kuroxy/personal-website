/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorPanel react component.
//          It is used to organize the monitor views of the laboratory page.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
import GameController from './GameController';
import MonitorRobot from './MonitorRobot';
import PanelLabel from "./PanelLabel";
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function MonitorPanel(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole MonitorPanel component, with the slide-in animation.
        <div className="flex h-4/5 w-screen">
            {/* Left panel*/}
            <div className="relative bg-gray-500 w-3/5 m-3 ml-6">
                {/* The name of the monitor. */}
                <PanelLabel label="Monitor Robot"/>
                {/* The handler for the game controller. */}
                <GameController/>
                {/* The handler for the video stream. */}
                <MonitorRobot/>
            </div>
            {/* Right panel*/}
            <div className="flex flex-col w-2/5">
                {/* Secondary video stream. */}
                <div className="relative bg-gray-300 flex-1 m-3 mr-6">
                    <PanelLabel label="Monitor World"/>
                </div>
                {/* Virtual twin of the robot. */}
                <div className="relative bg-gray-400 flex-1 m-3 mr-6">
                    <PanelLabel label="Virtual Twin"/>
                </div>
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////