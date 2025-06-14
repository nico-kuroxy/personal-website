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
import { useEffect, useState } from 'react';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
import { useHero } from "../../context/HeroProvider"
// Data.
import Robots from "/src/data/Robots.json"
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
    // Define the react variables.
    const [goToSlide, setGoToSlide] = useState(0)
    // Define the slides of the carousel.
    const slides = Robots.map((robot, index) => ({
        key: index,
        content: (<img src={robot.path} alt={`Robot ${index}`} onClick={() => { console.log("Clicked slide", index); setGoToSlide(index)}}
                    className="w-[45vw] h-[45vh] object-contain hover:shadow-2xl transition-transform hover:scale-105"/>),
    }))
    // Define the react hook to update the robot when the slide updates..
    useEffect(() => {
        // Update robot.
        setRobot(Robots[goToSlide])
        // Log the result.
        console.log("New robot selected:", Robots[goToSlide])
    }, [goToSlide]);
    // Return the html.
    return (
        // The container of the whole RobotCarousel component.
        <div className="flex flex-col w-full h-full items-center justify-center text-center">
        {/* Title of the section */}
            <span className='mt-32 pb-8 w-[30vw] text-6xl'>A collection of the robots I worked with</span>
            {/* The division of the section. */}
            <span className="w-2/3 h-px bg-yellow-500"></span>
            {/* The section itself. */}
            <div className='w-full h-[45vh] m-10 flex flex-col justify-center items-center'>
                {/* The actual carousel. offsetRadius sets the number of pictures showned side by side to the current one. It cannot be equal or more than half of the number of slides. */}
                <Carousel slides={slides} goToSlide={goToSlide} offsetRadius={2} showNavigation={false} animationConfig={{ tension: 120, friction: 14 }}/>
                {/* Navigation bar of the carousel. */}
                <div className='flex flex-row items-center justify-center text-5xl m-5 space-x-5'>
                    {/* Left arrow of the carousel. */}
                    <button onClick={() => setGoToSlide((goToSlide - 1 + Robots.length)%Robots.length)}><i className="text-yellow-500 hover:text-yellow-300 fa-regular fa-square-caret-left"/></button>
                    {/* Name of the robot */}
                    <span className='w-full text-center font-monoCustom'>{Robots[goToSlide].name}</span>
                    {/* Right arrow of the carousel. */}
                    <button onClick={() => setGoToSlide((goToSlide+1)%Robots.length)}><i className="text-yellow-500 hover:text-yellow-300 fa-regular fa-square-caret-right"/></button>
                </div>
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////