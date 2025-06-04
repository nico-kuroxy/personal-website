/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the PanelLabel react component.
//          It is used to display the label of the current panel.
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
export default function PanelLabel(props) {
    // Destructure the variables passed as argument.
    const { label } = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole PanelLabel component, with the slide-in animation.
        <div className="">
            <span className="border border-black absolute bg-[#ffffff] text-black m-4 p-2 font-monoCustom">{label}</span>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////