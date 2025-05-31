"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the home client render of the web application.
//          It is used to organize the content of the home webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { React, Suspense } from "react";
import dynamic from "next/dynamic";
// Components.
import Header from "../../components/header/Header.js";
import Hero from "../../components/hero/Hero.js";
import Footer from "../../components/footer/Footer.js";
// Contexts.
import { PageStyleProvider } from '../../context/PageStyleProvider.js'
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> WEBPAGE
// Webpage's client html render.
const HomePage = () => {
  return (
    <div className="min-h-screen bg-center bg-no-repeat bg-black glow-bg">
      <PageStyleProvider>
      <Header/>
      <Hero/>
      <Suspense fallback={<div>Loading...</div>}/>
      <Footer/>
      </PageStyleProvider>
    </div>
  );
};
export default HomePage;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////