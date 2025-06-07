/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorRobot react component.
//          It is used to display a the video feedback of the selected robot.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function MonitorRobot(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {monitorRobotSrc} = useLaboratory()
    // Return the html.
    return (
        // The container of the whole MonitorRobot component, with the slide-in animation.
        <div className="w-full h-full">
            {monitorRobotSrc && (<img src={monitorRobotSrc} alt="Video Stream" className="object-cover w-full h-full"/>)}
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////