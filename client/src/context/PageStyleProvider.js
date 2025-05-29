/**********************************************************************************************************************/
//   brief: This file defines the PageStyleProvider react context.
//          It is used to share accross the components all functions and variables pertaining to the style of the page.
//          This includes but is not limited to, the darkmode and the language of the page.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useState, useEffect, useContext, createContext } from 'react'
// Components
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> CONTEXT 
// Context creation.
const PageStyleProviderContext = createContext()
// Context declaration.
export function usePageStyle() { return useContext(PageStyleProviderContext) }
// Context provider.
export function PageStyleProvider(props) {
    // Destructure the props.
    const { children } = props
    // Use state variables.
    const [ theme, setTheme ] = useState("dark") // Whether or not the dark mode is enabled.
    const [ language, setLanguage ] = useState("en") // What is the selected language of the page.
    // Function called by the darkmode selection button to switch it.
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        console.log("New theme:", newTheme)
    };
    // Variables and functions that need to be accessed through this context.
    const value = { theme, setTheme, toggleTheme, language, setLanguage }
    // Check the user's settings for the darkmode. Loaded once upon the component's initialization.
    useEffect(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme') | null;
        if (savedTheme) {
          setTheme(savedTheme);
          document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else {
          // Use system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
          document.documentElement.classList.toggle('dark', prefersDark);
        }
      }, []);
    // Return the jsx html.
    return (
        <PageStyleProviderContext.Provider value={value}>
            {children}
        </PageStyleProviderContext.Provider>
    )
}