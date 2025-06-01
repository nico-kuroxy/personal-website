/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ControlPanel react component.
//          It is used to organize the main main of the laboratory page.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { motion } from 'framer-motion';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
// Utils.
import { slideUp } from '@/src/utils/animation';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function ControlPanel(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Return the html.
    return (
        // The container of the whole ControlPanel component, with the slide-in animation.
        <motion.div variants={slideUp} initial="hidden" animate="visible" exit="exit" className="fixed w-full bottom-0 left-1/2 -translate-x-1/2 ">   
            {/* The content itself. */}
            <footer className="w-3/4 bottom-0 left-1/2 -translate-x-1/2 z-50 flex flex-row justify-between bg-gradient-to-b from-[#00b9ff] to-[#1314EC] text-white text-2xl px-4 py-5 rounded-t-2xl">
                {/* Buttons on the left side. */}
                <div className="flex items-center space-x-3">
                    {/* Whether or not the app is connected to ROS. */}
                    <i class="fa-regular fa-lightbulb icon-glow text-red-500"></i>
                    <span>Connect ROS</span>
                    <span className="w-px h-6 bg-yellow-500"></span>
                    {/* Whether or not a world has been loaded */}
                    <i class="fa-regular fa-lightbulb icon-glow text-red-500"></i>
                    <span>Load world</span>
                    <span className="w-px h-6 bg-yellow-500"></span>
                    {/* Whether or not a robot has been loaded. */}
                    <i class="fa-regular fa-lightbulb icon-glow text-red-500"></i>
                    <span>Load robot</span>
                    <span className="w-px h-6 bg-yellow-500"></span>
                    {/* Whether or not a controller is connected. */}
                    <i class="fa-regular fa-lightbulb icon-glow text-red-500"></i>
                    <span>Connect controller</span>
                    <span className="w-px h-6 bg-yellow-500"></span>
                    {/* Apply the chosen parameters. */}
                    <i class="fa-solid fa-triangle-exclamation text-orange-400 flicker-icon-glow "></i>
                    <span className="text-orange-400 underline">Apply choices</span>
                </div>
                {/* Buttons on the right side. */}
                <div className="flex items-center space-x-2">
                    {/* The button to provide some help. */}
                    <span>Guide</span>
                    <i class="fa-solid fa-circle-question"></i>
                </div>
            </footer>
        </motion.div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////