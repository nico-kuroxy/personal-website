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
import { useState } from 'react';
// Contexts.
import { usePageStyle } from "../../context/PageStyleProvider"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function RobotCarousel(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Define the react variables.
    const [goToSlide, setGoToSlide] = useState(0)
    // Define the slides of the carousel.
    const robots = [{name: "P-Guard", path: `/robots/images/p-guard.png`}, {name: "S-Drone", path: `/robots/images/seasam-drone.png`}, {name: "S-Buoy", path: `/robots/images/seasam-buoy.png`}, {name: "UR5e", path: `/robots/images/ur5e.png`}, {name: "B1A", path: `/robots/images/sc-b1a.png`}, {name: "F1A", path: `/robots/images/sc-f1a.png`}]
    const slides = robots.map((robot, index) => ({
        key: index,
        content: (<img src={robot.path} alt={`Robot ${index}`} onClick={() => { console.log("Clicked slide", index); setGoToSlide(index)}}
                    className="w-[45vw] h-[45vh] object-contain hover:shadow-2xl transition-transform hover:scale-105"/>),
    }));
    // Return the html.
    return (
        // The container of the whole RobotCarousel component.
        <div className="flex flex-col w-3/4 h-full items-center justify-center text-center">
            {/* Title of the section */}
            <span className='mb-8 mt-32 w-[30vw] text-6xl'>A collection of the robots I worked with</span>
            {/* The division of the section. */}
            <span className="w-1/4 h-px bg-yellow-500"></span>
            {/* The section itself. */}
            <div className='w-1/2 h-[45vh] m-10 flex flex-col justify-center items-center'>
                {/* The actual carousel. offsetRadius sets the number of pictures showned side by side to the current one. It cannot be equal or more than half of the number of slides. */}
                <Carousel slides={slides} goToSlide={goToSlide} offsetRadius={2} showNavigation={false} animationConfig={{ tension: 120, friction: 14 }}/>
                {/* Navigation bar of the carousel. */}
                <div className='flex flex-row items-center justify-center text-5xl m-5 space-x-5'>
                    {/* Left arrow of the carousel. */}
                    <button onClick={() => setGoToSlide((goToSlide - 1 + robots.length)%robots.length)}><i className="text-yellow-500 hover:text-yellow-300 fa-regular fa-square-caret-left"/></button>
                    {/* Name of the robot */}
                    <span className='w-full text-center font-monoCustom'>{robots[goToSlide].name}</span>
                    {/* Right arrow of the carousel. */}
                    <button onClick={() => setGoToSlide((goToSlide+1)%robots.length)}><i className="text-yellow-500 hover:text-yellow-300 fa-regular fa-square-caret-right"/></button>
                </div>
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////