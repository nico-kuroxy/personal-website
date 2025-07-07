/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ModalHomepageHelp react component.
//          It is used to render the content of the help section overlaying the application.
/**********************************************************************************************************************/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useTranslations } from 'next-intl';
import ReactDom from "react-dom";
import { useState } from "react";
// Context
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function ModalHomepageHelp(props) {
    // Destructure the props
    const { onButtonClick, handleCloseModal } = props
    // Destructure the translations.
    const t = useTranslations('HomeModal')
    // Destructure the context.
    // Use state variables.
    // Return the jsx html.
    return (
    <>
      <div className="px-4 pb-6 space-y-2 text-base leading-relaxed">
        { /* <!-- About me section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">👨‍💻 {t("about")}</h2>
        <ul className="ml-6 list-disc list-inside dark:text-white text-blue-900 text-xl space-y-1">
          <li>{t("contact")}</li>
          <li>{t("download")}</li>
          <li>{t("visit")}</li>
          <li>{t("3d")}</li>
          <li>{t("robots")}</li>
          <li>{t("scrolldown")}</li>
        </ul>
        { /* <!-- Robotic section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">🎠 {t("carousel")}</h2>
        <ul className="ml-6 list-disc list-inside dark:text-white text-blue-900 text-xl space-y-1">
          <li>{t("arrow")}</li>
          <li>{t("picture")}</li>
          <li>{t("card")}</li>
          <li>{t("media")}</li>
          <li>{t("hardware")}</li>
          <li>{t("missions")}</li>
          <li>{t("shift")}</li>
          <li>{t("scrollup")}</li>
        </ul>
      </div>
    </>
  )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////