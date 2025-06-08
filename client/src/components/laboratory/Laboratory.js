import dynamic from 'next/dynamic';

const CameraViewer = dynamic(() => import('../ros/CameraViewer'), {
  ssr: false,
});

const RosBridge = dynamic(() => import('./RosBridge'), {
    ssr: false,
  });

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Laboratory react component.
//          It is used to organize the laboratory content of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
import ControlPanel from './ControlPanel';
import MonitorPanel from './MonitorPanel';
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
        <div className='flex h-screen justify-center items-center'>
            {/* The RosBridge component to establish communication with the server. */}
            <RosBridge/>
            {/* The canvas for the ros data feedback. */}
            <MonitorPanel/>
            {/* The footer containing all the buttons / lights to set up the laboratory, animated into view. */}
            <ControlPanel/>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////