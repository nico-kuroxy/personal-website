/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the RobotDeck react component.
//          It is used to display the deck of cards that present the information about the robots.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { useState, useEffect } from 'react';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
import { useHero } from "../../context/HeroProvider"
// Components.
import RobotCard from './RobotCard';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function RobotDeck(props) {
    // Destructure the props passed as argument.
    // Define the use state variables of the component.
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const [cardContent, setCardContent] = useState("")
    // Define the references of the component.
    const { robot } = useHero()
    // Define the const variables of the component.
    const cards = [ // The deck of robot cards.
        { title: "Media" }, { title: "Features" }, { title: "Mission" }
      ]
    const offsets = [  // The offset between each card.
        { top: "12.5%", left: "7.5%" },
        { top: "25%", left: "15%" },
        { top: "37.5%", left: "22.5%" }
    ]
    const sortedCards = cards.map((card, index) => ({  // The list of cards ordered by their index.... and whether or not they are selected.
      ...card,  // Copy the full content of the card.
      order: index === selectedCardIndex ? 2 : (selectedCardIndex + 2 - index) % 3   // Assign the order of the card : its original index OR 3 (the top) if the card is selected.
    }))
    // Define the react hook to update the content of the displaued card when the deck updates..
    useEffect(() => {
        // Register content.
        const content = (sortedCards[selectedCardIndex]?.title === "Features") ? robot?.features :
            (sortedCards[selectedCardIndex]?.title === "Mission") ? robot?.mission :
                robot?.media
        // Update content.
        setCardContent(content)
        // Log the result.
        console.log("New card selected:", sortedCards[selectedCardIndex])
    }, [selectedCardIndex, robot]);
    // Return the html content of the card.
    return (
        // The container of the whole RobotDeck component.
        <div className='flex flex-col w-full h-full items-center justify-center text-center -mt-24'>
        {/* Render the complete deck. */}
            <div className="relative w-full h-[50vh] flex items-center justify-center">
                {/* Base card at the bottom, never moves */}
                <RobotCard key={-1} title={"Robot : " + robot?.full_name} content={""} orderIndex={-1} style={{zIndex: -1}} className="bg-yellow-500 text-white"/>
                {/* Render the 3 layered cards */}
                {sortedCards.map((card, i) => {
                // Apply the offset between each card of the pile.
                const style = { top: offsets[card.order].top, left: offsets[card.order].left, zIndex: card.order }
                // Return the html of the component.
                return (
                    // The render of each card of the stack.
                    <RobotCard key={card.title} title={card.title} content={cardContent} orderIndex={card.order} style={style}
                    onClick={() => { if (i !== selectedCardIndex) setSelectedCardIndex(i); console.log("Clicked on", card.title) }} 
                    />
                )
                })}
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////