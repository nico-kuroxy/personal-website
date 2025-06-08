/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorAerial react component.
//          It is used to display a camera stream provided through a rostopic.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function MonitorAerial(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {monitorRobotAerialSrc} = useLaboratory()
    // Return the html.
    return (
        // The container of the whole MonitorAerial component, with the slide-in animation.
        <div className="w-full h-full">
            {monitorRobotAerialSrc && (<img src={monitorRobotAerialSrc} alt="Aerial Video Stream" className="object-cover w-full h-full"/>)}
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////