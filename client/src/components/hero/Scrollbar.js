/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Scrollbar component of the homepage.
//          It is used to go from one screen of the homepage to the other.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
// Components.
// Contexts.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Scrollbar(props) {
    // Destructure the variables passed as argument.
    const {currentScreen, setCurrentScreen} = props
    // Return html.
    return (
        // The main container of the scrollbar.
        <div className="fixed right-5 top-1/2 flex flex-col gap-4 z-50 justify-center items-center">
            { /* We iterate over the number of screens. */}
            {[0, 1].map((index) => (
                // To create one clickable dot for each of them, highlighted if its matches the current screen.
                <div key={index} onClick={() => setCurrentScreen(index)} 
                    className={`transition-all cursor-pointer rounded-full ${currentScreen === index? "w-4 h-4 bg-white" : "w-2 h-2 bg-gray-500"}`}/>
            ))}
        </div>
    )
}