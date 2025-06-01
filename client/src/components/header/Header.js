"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Header react component.
//          It is used to organize the tabs at the top of the webpage.
//          Design choice : only the elements on the left side of the header + placeholders on the right side have
//          explanative titles. This is done to keep some sense of symmetry and not overload the page.
//          Furthermore, only the hyperlink texts are underlined when hovered.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Header(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Define the router to navigate between pages.
    const router = useRouter()
    // Return the html.
    return (
        // The container of the whole header component, applying the gradient style to it.
        <nav className="fixed top-0 z-50 w-full flex flex-row justify-between bg-gradient-to-b from-[#1314EC] to-[#00b9ff] text-white text-2xl px-3 py-5 rounded-b-2xl"> 
            {/* The container of the elements on the left side of the header, in particular the mail address. */}
            <div className="flex mr-4 items-center space-x-2">
                {/* Open the default mail application of the user. Have a small shadow to highlight it in the browser. */}
                <a href="mailto:nicolas.erbetti.k@gmail.com">
                    <i title="Send me a mail!" className="fa-solid fa-paper-plane text-yellow-500 hover:text-yellow-300 shadow-[0_0_5px_rgba(0,0,255,1)] hover:shadow-[0_0_5px_rgba(0,0,0,0.6)] active:shadow-[0_0_5px_rgba(255,255,255,0.6)] p-1 text-xl"></i>
                </a>
                {/* Copy the mail address when clicked upon. */}
                <button title="Click to copy" className="active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300"
                  onClick={e => {
                    // Get text content of the clicked container.
                    const text = e.currentTarget.innerText
                    // Log.
                    console.log("Copied text:", text)
                    // Copy to clipboard
                    navigator.clipboard.writeText(text)
                      .then(() => alert('Copied "' + text + '" to clipboard!'))
                      .catch(() => alert('Failed to copy the mail address!'))
                  }}>
                    nicolas.erbetti.k@gmail.com
                </button>
            </div>
            {/* The container of the elements on the right side of the header, in particular the home button, the publication, the resume... */}
            <div className="flex ml-4 items-center space-x-2">
                {/* Redirect toward the front page of the webapp. */}
                <button className="active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300 hover:underline" 
                  onClick={() => router.push('/')}>
                    home
                </button>
                {/* Teaser for some features coming soon (the lab...). */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <button title="Coming soon" className="active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300 hover:underline" 
                  onClick={() => router.push('laboratory')}>
                    lab
                </button>
                {/* Redirect toward a list of all the publications I co-wrote, on arXiv. */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <a href="https://arxiv.org/abs/2404.02569v2" target="_blank" rel="noopener noreferrer" className="active:[text-shadow:0_0_5px_#ffffff] flex items-center">
                    <span className="active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300 hover:underline">publication</span> 
                </a>
                {/* Download my resume on the user's system. */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <a href="/resume/cv_nicolas_erbetti_en.pdf" target="_blank" rel="noopener noreferrer">
                    <span className="active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300 hover:underline">CV</span> 
                </a>
                {/* Redirect toward my github page. */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <a href="https://github.com/nico-kuroxy" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <i className="fa-brands fa-square-github active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300 text-3xl"></i>
                </a>
                {/* Redirect toward my linkedin page. */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <a href="https://www.linkedin.com/in/nicolas-erbetti/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <i className="fa-brands fa-linkedin active:[text-shadow:0_0_5px_#ffffff] active:text-yellow-300 hover:text-yellow-300 text-3xl"></i>    
                </a>
                {/* Toggle and display the dark mode has been selected. It has a fixed width to prevent element displacements. */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <button title="WIP" onClick={toggleTheme} className="w-5 flex flex-col items-center relative group hover:text-yellow-300 text-yellow-500 text-2xl">
                    {/* Current theme icon */}
                    {theme === 'dark' ? (<i className="fa-regular fa-moon [text-shadow:0_0_5px_#ff073a]"></i>) : (<i className="fa-regular fa-sun [text-shadow:0_0_5px_#ff073a]"></i>)}
                </button>
                {/* Select and display the selected language. */}
                <span className="w-px h-6 bg-yellow-500"></span>
                <div title="WIP" className="flex relative inline-block text-center group">
                    <i className="fa-solid fa-language text-4xl cursor-pointer 
                                active:[text-shadow:0_0_5px_#ffffff] 
                                active:text-yellow-300 group-hover:text-yellow-300"></i>
                    {/* Dropdown menu - shows on hover (via group-hover) */}
                    <div className="opacity-0 group-hover:opacity-100 
                                pointer-events-none group-hover:pointer-events-auto
                                transition-opacity duration-200 w-full
                                absolute left-0 top-full bg-white rounded-md shadow-lg z-10">
                        <ul className="py-1 text-blue-800">
                        {["en", "fr", "jp"].map((lang) => (
                            <li key={lang} onClick={() => setLanguage(lang)}
                             className={`text-sm cursor-pointer py-1 hover:bg-yellow-400 hover:text-blue-700 ${
                                language === lang ? "font-bold bg-yellow-300" : ""}`}>
                                {lang.toUpperCase()}
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////