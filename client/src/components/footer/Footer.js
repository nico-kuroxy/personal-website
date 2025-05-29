/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Footer react component.
//          It is used to organize the tabs at the bottom of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
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
        // The container of the whole footer component, applying the gradient style to it.
        <div className="fixed bottom-0 right-0 flex flex-row justify-between bg-gradient-to-b from-blue-600 to-blue-900 text-white px-1 py-3 rounded-t-2xl z-50"> 
            <span>Powered by</span>
            <a href="https://nextjs.org/" className="pl-1 font-bold text-yellow-500 hover:text-yellow-300" target="_blank" rel="noopener noreferrer">Next.js</a>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////