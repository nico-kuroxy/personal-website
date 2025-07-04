"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Footer react component.
//          It is used to organize the tabs at the bottom of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { useState } from "react";
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider";
// Modals.
import Modal from "../../modals/Modal";
import ModalHomepageHelp from "../../modals/ModalHomepageHelp";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Footer(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Define the component's variable.
    const [displayModal, setDisplayModal] = useState(false)
     // Return the html.
     return (
        // The container of the whole footer component, applying the gradient style to it.
        <footer className="px-4 py-5 space-x-1 fixed bottom-0 right-0 flex flex-row justify-between bg-gradient-to-b from-[#00b9ff] to-[#1314EC] text-white px-1 py-3 rounded-t-2xl z-40"> 
            {/* Buttons on the right side. */}
            <div className="flex items-center justify-center text-center space-x-2">
                {/* The button to provide some help. */}
                <button onClick={() => setDisplayModal(true) } className='flex items-center justify-center text-center'>
                    <span className="text-2xl">Guide</span>
                </button>
                {/* Émoji of a cat with a link to a picture of Dali. */}
                <a href="/dali.jpg" target="_blank" rel="noopener noreferrer" className='flex items-center justify-center text-center'><i className="text-xl fa-solid fa-cat"></i></a>
            </div>
            {/* Modal of the homepage guide button. */}
            {(displayModal) && (
                <Modal name="Welcome to the homepage help corner !​"
                    subtitles={["Here, you can have a brief overview of who I am as well as the robots I worked on.", "This project is still work-in-progress. UI/UX design is not my specialty but as you can (hopefully) see, I am doing my best and having a blast while doing so !"]}
                    handleCloseModal={() => setDisplayModal(false) }>
                    <ModalHomepageHelp handleCloseModal={() => setDisplayModal(false)}/>
                </Modal>
            )}
        </footer>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////