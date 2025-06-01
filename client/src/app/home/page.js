"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the home client render of the web application.
//          It is used to organize the content of the home webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { React } from "react";
// Components.
import Hero from "../../components/hero/Hero.js";
// Contexts.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> WEBPAGE
// Webpage's client html render.
const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-black glow-bg">
      { /* Main content of the webpage.*/ }
      <Hero/>
    </div>
  );
};
export default HomePage;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////