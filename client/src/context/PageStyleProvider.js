/**********************************************************************************************************************/
//   brief: This file defines the PageStyleProvider react context.
//          It is used to share accross the components all functions and variables pertaining to the style of the page.
//          This includes but is not limited to, the darkmode and the language of the page.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import Cookies from 'js-cookie'
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
    const [ isMounted, setIsMounted ] = useState(false) // Whether or not the component is mounted.
    const [ theme, setTheme ] = useState("light") // Whether or not the dark mode is enabled.
    const [ language, setLanguage ] = useState("en") // What is the selected language of the page.
    // Function called by the darkmode selection button to switch it.
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        console.log("New theme:", newTheme)
    }
    // Define the function to update the locale.
    const updateLanguage = (newLang) => {
      Cookies.set('NEXT_LOCALE', newLang, { expires: 365 }) // cookie valid for 1 year
      // Only reload if language actually changed
      if (newLang !== language) {
        window.location.reload()
      }
    }
    // Variables and functions that need to be accessed through this context.
    const value = { theme, setTheme, toggleTheme, language, setLanguage, updateLanguage }
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
        // Update the locale cookie.
        const localeFromCookie = Cookies.get('NEXT_LOCALE')
        if (localeFromCookie && localeFromCookie !== language) {
          setLanguage(localeFromCookie)
        }
        // Update the isMounted flag.
        setIsMounted(true);
      }, [])
      // Only the render the component when it's mounted, which is important to avoid FOUC and blinking due to mismatching light theme.
      if (!isMounted) {
        return null;
    }
    // Return the html.
    return (
        <PageStyleProviderContext.Provider value={value}>
            {children}
        </PageStyleProviderContext.Provider>
    )
}