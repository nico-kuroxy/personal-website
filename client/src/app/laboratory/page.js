"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the client render of the web application.
//          It is used to organize the content of the laboratory webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { React } from "react";
// Components.
import Laboratory from "../../components/laboratory/Laboratory.js";
// Contexts.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> WEBPAGE
// Webpage's laboratory client html render.
const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-blue-200 dark:bg-black glow-bg">
      { /* Laboratory component. */ }
      <Laboratory/>
    </div>
  );
};
export default Page;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////