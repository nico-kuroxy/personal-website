/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Typewritter react component.
//          It is used to create an animation to display characters letters by letters.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { useEffect, useState } from 'react';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
// Components.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Typewriter(props) {
    // Destructure the variables passed as argument.
    const {words, speed, pause} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Initialize variables.
    const [index, setIndex] = useState(0);        // Word index, start at 0 to get the first word of the list.
    const [subIndex, setSubIndex] = useState(0);  // Letter index, start at 0 to get up to the first letter of each word.
    const [deleting, setDeleting] = useState(false); // Whether or not we are in the deleting or typing animation.
    // Cycle through the list of words and type them one by one.
    useEffect(() => {
        let timeout;
        // If we went through every letter of the word, we start the deleting mode after waiting for the pause duration (in ms).
        // setTimeout() is a build-in js function that executes once after a certain period of time
        if (subIndex === words[index].length + 1 && !deleting) {
          timeout = setTimeout(() => {
            setDeleting(true);
          }, pause);
        } else if (subIndex === 0 && deleting) {
          // If we deleted every letter, we start the typing mode and increment the word index.
          timeout = setTimeout(() => {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }, pause / 2);
        } else {
           // We type or erase letter at the given speed. Again, setTimeout() is a build-in js function that executes once after a certain period of time.
           // Here, we wait for the duration of speed or speed/2 (in ms) before typing/erasing a new letter.
          timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (deleting ? -1 : 1));
          }, deleting ? speed / 2 : speed);
        }
        // Here, clearTimeout is used to cancel a timeout that was previously scheduled timeout to prevent memory leaks or unintended effects (for instance, if the component re-renders).
        return () => clearTimeout(timeout);
      }, [subIndex, deleting, index, words, speed, pause]); // We call this function every time we update the list of words, the speed value, the pause duration, or move one letter, or enter delete mode, or change word.
    // Return the html.
    return (
      // Display the animation.
      <span className="text-6xl font-monoCustom">
        {/* Display the indexed word of the list up to the subindexed letter. */}
        {words[index].substring(0, subIndex)}
        {/* Display a vertical bar pulsating to represent the typing. */}
        <span className="animate-pulse -ml-4">|</span>
      </span>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////