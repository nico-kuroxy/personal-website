"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Footer react component.
//          It is used to organize the tabs at the bottom of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { motion } from 'framer-motion';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider";
// Utils.
import { slideUp } from '@/src/utils/animation';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Footer(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
     // Return the html.
     return (
        // The container of the whole footer component, applying the gradient style to it and animating it into view.
        <footer>
            {/* The actual component. */}
            <motion.div variants={slideUp} initial="hidden" animate="visible" exit="exit" className="fixed bottom-0 right-0 flex flex-row justify-between bg-gradient-to-b from-[#00b9ff] to-[#1314EC] text-white px-1 py-3 rounded-t-2xl z-50"> 
                <span>Powered by</span>
                <a href="https://nextjs.org/" className="pl-1 font-bold text-yellow-500 hover:text-yellow-300" target="_blank" rel="noopener noreferrer">Next.js</a>
                <a href="/dali.jpg" target="_blank" rel="noopener noreferrer">🐈</a>
            </motion.div>
        </footer>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////