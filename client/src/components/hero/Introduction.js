/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the Introduction react component.
//          It is used to organize the text introducing me..
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Contexts.
import { useTranslations } from 'next-intl';
import { usePageStyle } from "../../context/PageStyleProvider"
// Components.
import ConversionButtons from "./ConversionButtons"
import Typewriter from "./Typewriter"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function Introduction(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const {theme, toggleTheme, language, setLanguage} = usePageStyle()
    // Destructure the translations.
    const t = useTranslations('HomeHero')
    // Return the html.
    return (
        // The container of the whole Introduction component.
        <div className="flex justify-center flex-grow items-center pl-12 dark:text-white text-blue-900">
            <div className="flex flex-col items-start text-left max-w-4xl space-y-2">
                {/* My name. */}
                <span className="flex text-4xl">{t("name")}</span>
                {/* My profession. */}
                <div className="text-5xl font-monoCustom -m-1">
                    <p>{t("engineer")}</p>
                </div>
                {/* What I do. */}
                <div className="max-w-3xl text-2xl">
                    <p>
                        <span>{t("work")}</span>                   
                        <Typewriter words={t.raw("words")} speed={100} pause={1250} />
                    </p>
                        <p>{t("solution")}</p>
                    <p>{t("goal")}</p>
                </div>
                {/* The buttons I want the user to click. */}
                <ConversionButtons/>
            </div>
        </div>

    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////