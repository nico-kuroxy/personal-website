/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorCamera react component.
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
export default function MonitorWorld(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole MonitorWorld component, with the slide-in animation.
        <div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////