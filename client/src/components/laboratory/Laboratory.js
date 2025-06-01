import dynamic from 'next/dynamic';

const CameraViewer = dynamic(() => import('../ros/CameraViewer'), {
  ssr: false,
});

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Laboratory react component.
//          It is used to organize the laboratory content of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
import ControlPanel from './ControlPanel';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Laboratory(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole Laboratory component.
        <div>
            {/* The viewer for the ros camera feedback. */}
            <CameraViewer/>
            {/* The footer containing all the buttons / lights to set up the laboratory. */}
            <ControlPanel/>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////