/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Hero react component.
//          It is used to organize the main content of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useRef, useEffect } from "react";
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
// Components.
import Cube from "./Cube"
import Footer from "@/src/components/footer/Footer.js";
import Introduction from "./Introduction"
import Summary from "./Summary"
import RobotCarousel from "./RobotCarousel";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Hero(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Define the references.
    const targetFirstScreenRef = useRef(null)
    const targetSecondScreenRef = useRef(null)
    const lastScrollY = useRef(0);
    const hasScrolled = useRef(false)
    // Define an effect hook to automatically scroll down to a given section.
    useEffect(() => {
        // Define the scroll callback function.
        const handleScroll = () => {
            // Register the current scroll y component.
            const currentY = window.scrollY
            // Prevent repeated triggering.
            if (hasScrolled.current) return
            // Scroll down.
            if (currentY > lastScrollY.current) {
                hasScrolled.current = true
                targetSecondScreenRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            // Scroll up.
            else if (currentY < lastScrollY.current) {
                hasScrolled.current = true
                targetFirstScreenRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            // Update scroll position.
            lastScrollY.current = currentY
            // Allow retriggering after scroll settles.
            setTimeout(() => { hasScrolled.current = false }, 100) // Debounce window
        }
        // Add the event listener when the component is mounted.
        window.addEventListener("scroll", handleScroll)
        // Remove the event listener when the component is unmounted.
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    // Return the html.
    return (
        // The container of the whole Hero component.
        <div className="flex flex-col mb-20 flex-grow items-center justify-center">
            <div  ref={targetFirstScreenRef}  className="flex-row flex justify-center">
                {/* Personal infos take 2/3 and center in its container. */}
                <div className="flex-col basis-3/5 flex justify-center items-center">
                    {/* Some informations about me. */}
                    <Introduction/>
                </div>
                {/* Cube takes 1/3 and centers its canvas */}
                <div className="basis-2/5 flex justify-center items-center">
                    {/* Interactible cube with my picture and a little easter egg */}
                    <Cube imageFrontUrl="lightning-in-a-bottle.jpg" imageBackUrl="jinx.jpg" />
                </div>
            </div>
            {/* The summary with some metrics about my experiences. */}
            <Summary/>
            {/* Second screen */}
            <div ref={targetSecondScreenRef} className="flex flex-col h-screen w-full my-44 items-center justify-center">
                {/* The carousel with some information about the robots I worked on. */}
                <RobotCarousel/>
            </div>
            { /* Footer of the webpage.*/ }
            <Footer/>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////