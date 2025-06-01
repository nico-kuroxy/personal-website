/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ConversionButtons react component.
//          It is used to display the buttons that I want the user to interact with.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { useRouter } from 'next/navigation';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function ConversionButtons(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Define the router to navigate between pages.
    const router = useRouter()
     // Return the html.
     return (
        // The container of the whole ConversionButtons component.
        <div className="flex pt-2 font-bold text-center font-monoCustom text-xl justify-center items-center">
            {/* Open the mail application. */}
            <a href="mailto:nicolas.erbetti.k@gmail.com">
                <span className="flex active:[text-shadow:0_0_5px_#ff073a] bg-yellow-500 hover:bg-yellow-300 active:bg-yellow-300 p-2 ml-2 m-2">Contact me</span>
            </a>
            {/* Download the resume. */}
            <a href="/resume/cv_nicolas_erbetti_en.pdf" download>
                <span className="flex items-center justify-center active:[text-shadow:0_0_5px_#ff073a] bg-yellow-500 hover:bg-yellow-300 active:bg-yellow-300 p-2 m-2 mr-2">Download CV</span>
            </a>
            {/* Go the laboratory page. */}
            <button title="Coming soon" className="flex active:[text-shadow:0_0_5px_#ff073a] bg-yellow-500 hover:bg-yellow-300 active:bg-yellow-300 p-2 m-2"
                onClick={() => router.push('/laboratory')}>
                    Visit the lab
            </button>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////