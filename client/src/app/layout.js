export const dynamic = "force-dynamic";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the layout of the web application, shared across multiple pages.
//          Also, it defines the metadata of the webpage.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { React, Suspense } from "react";
import { notFound } from 'next/navigation';
// Styles.
import "../styles/globals.css";
// Components.
import Header from "../components/header/Header.js";
import Footer from "../components/footer/Footer.js";
// Context.
import ContextProvider from "../context/ContextProvider";
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> LAYOUT
// Metadata definition.
export const metadata = {
  title: "Nicolas Erbetti",
  description: "Nicolas Erbetti's personal website.",
};
// Root layout.
export default async function RootLayout({ children }) {
  // Retrieve locale.
  let locale, messages
  try {
    locale = await getLocale()
    messages = await getMessages()
  } catch (error) {
    console.error('Translation load failed:', error)
  }
  // Return html.
  return (
    <html lang={locale}>
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
          { /* Wrapper for the language handler. */ }
          <NextIntlClientProvider locale={locale} messages={messages}>
            { /* Header of the webpage.*/ }
            <header><Header/></header>
            { /* Main content of the page.*/ }
            <main>
              { /* Display a loading text on the screen. */ }
              <Suspense fallback={<div>Loading...</div>}/>
              { /* Children of the layout, ie the element of the page. */ }
                {children}
              { /* Root of the modal. */ }
              <div id="portal"></div>
            </main>
          </NextIntlClientProvider>            
        </ContextProvider>
      </body>
    </html>
  )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////