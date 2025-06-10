"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the home client render of the web application.
//          It is used to organize the content of the home webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { React, useRef, useEffect } from "react";
// Components.
import Hero from "@/src/components/hero/Hero.js";
import RobotCarousel from "@/src/components/hero/RobotCarousel.js";
import Footer from "@/src/components/footer/Footer.js";
// Contexts.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> WEBPAGE
// Webpage's client html render.
const HomePage = () => {
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-no-repeat bg-black glow-bg ">
      { /* First screen.*/ }
      <div ref={targetFirstScreenRef} className="flex flex-col justify-center items-center h-screen w-full -mt-10">
        { /* Main content of the webpage.*/ }
        <Hero targetSecondScreenRef={targetSecondScreenRef} hasScrolled={hasScrolled}/>
      </div>
      {/* Second screen */}
      <div ref={targetSecondScreenRef} className="flex flex-col min-h-screen w-full items-center justify-center">
        {/* The carousel with some information about the robots I worked on. */}
        <RobotCarousel/>
      </div>
      { /* Footer of the webpage.*/ }
      <Footer/>
    </div>
  );
};
export default HomePage;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////