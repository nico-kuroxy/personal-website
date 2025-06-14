/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the RobotCard react component.
//          It is used to display one card from the RobotDeck.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { useState } from 'react';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function RobotCard(props) {
    // Destructure the variables passed as argument.
    const { title, content, orderIndex, style, onClick } = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Define the react variables.
    // Return the html.
    return (
        // The container of the whole RobotCard component.
        <div style={{...style, top: '0%', left: '15%', transform: `translate(${style.left}, ${style.top})`}}
            className={`flex flex-col text-left w-[75%] h-[50vh] absolute cursor-pointer rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-[transform] duration-500 ease-in-out p-4 `
                + (orderIndex === -1? " hover:bg-orange-400 bg-orange-500 " : orderIndex === 2? " bg-blue-500 text-white " : " text-black bg-white hover:bg-yellow-200 " )}
             onClick={onClick}>
            { /* The card title */}
            <h3 className="text-3xl font-semibold font-monoCustom ">{title}</h3>
            { /* The content of the card. */ }
            {(orderIndex===2 && Array.isArray(content) && title!=="Media") && <ul className="mt-6 space-y-1 list-disc pl-8">{content.map((item, index) => {return <li key={index} className="text-2xl">{item}</li>})}</ul>}
            { /* The video embeed if we are in the media section.. */ }
            {(orderIndex===2 && title==="Media") && <iframe className="w-full h-[400px]" src={content} title="Demo video" allow="autoplay; encrypted-media" allowFullScreen/>}
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////