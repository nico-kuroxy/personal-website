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
    const robots = [{name: "Pearl Guard", path: `/robots/images/p-guard.png`}, {name: "Seasam Drone", path: `/robots/images/seasam-drone.png`}, {name: "Seasam Buoy", path: `/robots/images/seasam-buoy.png`}, {name: "Universal Robot 5e", path: `/robots/images/ur5e.png`}, {name: "B1A", path: `/robots/images/sc-b1a.png`}, {name: "F1A", path: `/robots/images/sc-f1a.png`}]
    const slides = robots.map((robot, index) => ({
        key: index,
        content: (<img src={robot.path} alt={`Robot ${index}`} onClick={() => { console.log("Clicked slide", index); setGoToSlide(index); setRobot(robot)}}
                    className="w-[25vw] h-[25vh] object-contain hover:shadow-xl transition-transform hover:scale-105"/>),
    }));
    const [robot, setRobot] = useState(robots[0])
    // Return the html.
    return (
        // The container of the whole RobotCarousel component.
        <div className="flex flex-col w-5/6 h-full text-center">
            {/* Title of the section */}
            <span className='w-full mt-40 text-5xl'>The robots I worked on</span>
            {/* The section itself. */}
            <div className='w-full h-1/2 flex flex-row justify-center items-center'>
                {/* The actual carousel. offsetRadius sets the number of pictures showned side by side to the current one. It cannot be equal or more than half of the number of slides. */}
                <Carousel slides={slides} goToSlide={goToSlide} offsetRadius={2} showNavigation={false} animationConfig={{ tension: 120, friction: 14 }}/>
                {/* Name of the robot */}
                <span className='w-full text-left text-5xl'>{robot.name}</span>
            </div>
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////