/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the RobotCarousel react component.
//          It is used to display the Carousel that storing data about every robot I worked with.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import dynamic from 'next/dynamic';
const Carousel = dynamic(() => import('react-spring-3d-carousel'), {
  ssr: false
});
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider";
import { useHero } from "../../context/HeroProvider";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function RobotCarousel(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    const {robot, setRobot} = useHero()
    // Destructure the translations.
    const t = useTranslations('HomeHero')
    // Define the react variables.
    const [goToSlide, setGoToSlide] = useState(0)
    const [robots, setRobots] = useState([])
    // Define the slides of the carousel.
    const slides = robots?.map((robot, index) => ({
        key: index,
        content: (<img src={robot.path} alt={`Robot ${index}`} onClick={() => { console.log("Clicked slide", index); setGoToSlide(index)}}
                    className="w-[200%] h-full transition-shadow duration-300 ease-in-out shadow-lg hover:shadow-[0_15px_50px_rgba(0,0,0,0.75)] rounded-xl object-contain transition-transform duration-300 hover:scale-105"/>),
    }))
    // Load the robots list from the language file upon component mounting.
    useEffect(() => {
        // Read the robots list.
        const r = t.raw("robots")
        // Update it.
        if (Array.isArray(r)) { setRobots(r) }
    }, [])
    // Define the react hook to update the robot when the slide updates..
    useEffect(() => {
        // Update robot.
        setRobot(robots[goToSlide])
        // Log the result.
        console.log("New robot selected:", robots[goToSlide])
    }, [goToSlide, robots]);
    // If the robots are not loaded, return a loading spinner.
    if (!robots.length) { 
        return (
        <div className="flex items-center justify-center h-full">
          <ClipLoader color="#facc15" size={60} />
        </div>
    )}
    // Return the html.
    else return (
        // The container of the whole RobotCarousel component.
        <div className="flex flex-col w-full h-full dark:text-white text-blue-900 items-center justify-center text-center mt-16">
        {/* Title of the section */}
            <span className='pb-8 w-[30vw] text-6xl'>{t("collection")}</span>
            {/* The division of the section. */}
            <div className="relative w-2/3 h-3 mt-2 flex items-center justify-center">
                {/* Left bar */}
                <div className="w-1/2 h-px dark:bg-yellow-500 bg-yellow-300 transform origin-right rotate-6"></div>
                {/* Right bar */}
                <div className="w-1/2 h-px dark:bg-yellow-500 bg-yellow-300 transform origin-left -rotate-6"></div>
            </div>            
            {/* The section itself. */}
            <div className='w-full h-[42vh] flex flex-col justify-center items-center'>
                {/* The actual carousel. offsetRadius sets the number of pictures showned side by side to the current one. It cannot be equal or more than half of the number of slides. */}
                <Carousel slides={slides} goToSlide={goToSlide} offsetRadius={2} showNavigation={false} animationConfig={{ tension: 120, friction: 14 }}/>
                {/* Navigation bar of the carousel. */}
                <div className='flex flex-row items-center justify-center text-5xl space-x-4 mt-2'>
                    {/* Left arrow of the carousel. */}
                    <button onClick={() => setGoToSlide((goToSlide - 1 + robots.length)%robots.length)}><i className="dark:text-yellow-500 hover:text-yellow-300 text-yellow-300 hover:text-yellow-500 fa-regular fa-square-caret-left"/></button>
                    {/* Name of the robot */}
                    <span className='w-full text-center font-monoCustom'>{robots[goToSlide].name}</span>
                    {/* Right arrow of the carousel. */}
                    <button onClick={() => setGoToSlide((goToSlide+1)%robots.length)}><i className="dark:text-yellow-500 hover:text-yellow-300 text-yellow-300 hover:text-yellow-500 fa-regular fa-square-caret-right"/></button>
                </div>
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////