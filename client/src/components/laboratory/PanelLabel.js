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
import useSWR from 'swr';
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function PanelLabel(props) {
    // Destructure the variables passed as argument.
    const { labels, onClick, pose="left-0", key=null } = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    const {whichView} = useLaboratory()
    // Destructure the translations.
    // Return the html.
    return (
        // The container of the whole PanelLabel component, with the slide-in animation.
        <div className={"absolute mt-5 z-40 " + pose}>
            {labels.map((label, idx) => {
                return (
                    <button key={idx} className={"border border-black text-black ml-4 p-2 font-monoCustom" 
                        + ((whichView === label)? " font-bold text-white bg-yellow-500 " : " bg-[#ffffff] ")
                        + ((onClick)? " hover:bg-yellow-300 " : " ")}
                        onClick={ () =>  onClick?.(label)}
                        disabled={!onClick}>
                        {label}
                    </button>
            )})}
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////