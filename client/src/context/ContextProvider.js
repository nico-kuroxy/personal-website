"use client";

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ContextProvider react component.
//          It is used to cleany organize all contexts files for this project.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
// Components
// Context
import { HeroProvider } from './HeroProvider.js';
import { PageStyleProvider } from './PageStyleProvider.js'
import { LaboratoryProvider } from './LaboratoryProvider.js';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function ContextProvider({children}) {
    return(
        <PageStyleProvider>
            <HeroProvider>
                <LaboratoryProvider>
                    {children}
                </LaboratoryProvider>
            </HeroProvider>
        </PageStyleProvider>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////