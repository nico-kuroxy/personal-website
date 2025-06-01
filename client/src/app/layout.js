/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the layout of the web application, shared across multiple pages.
//          Also, it defines the metadata of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { React, Suspense } from "react";
// Styles.
import "../styles/globals.css";
// Components.
import Header from "../components/header/Header.js";
import Footer from "../components/footer/Footer.js";
// Context.
import ContextProvider from "../context/ContextProvider";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> LAYOUT
// Metadata definition.
export const metadata = {
  title: "Nicolas Erbetti",
  description: "Nicolas Erbetti's personal website.",
};
// Root layout.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      { /*Metadata and ressources used by the webpage.*/ }
      <head>
        { /*Import the EB Garamond font.*/ }
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet" />
        { /*Import the fontAwesome icons.*/ }
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" /> 
      </head>
      { /*Default style of the webpage's content.*/ }
      <body className={`text-white font-serifCustom antialiased`}>
        { /* Provide the whole context variables to the applications.*/ }
        <ContextProvider>
          { /* Header of the webpage.*/ }
          <header><Header/></header>
          <main>
            <Suspense fallback={<div>Loading...</div>}/>
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////