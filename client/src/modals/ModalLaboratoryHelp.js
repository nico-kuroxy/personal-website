/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the ModalLaboratoryHelp react component.
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
export default function ModalLaboratoryHelp(props) {
    // Destructure the props
    const { onButtonClick, handleCloseModal } = props
    // Destructure the translations.
    const t = useTranslations('LabModal')
    // Destructure the context.
    // Use state variables.
    // Return the jsx html.
    return (
    <>
      <div className="px-4 pb-6 space-y-2 text-base dark:text-white text-blue-900 leading-relaxed">
        { /* <!-- Simulation Section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">🖥️ {t("simulation")}</h2>
        <ul className="ml-6 list-disc list-inside text-xl space-y-1">
          <li>{t("ros")}</li>
          <li>{t("controller")}</li>
          <li>{t("switch")}</li>
          <li>{t("choice")}</li>
        </ul>
        { /* <!-- Operation Section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">🎮 {t("operation")}</h2>
        <ul className="ml-6 list-disc list-inside text-xl space-y-1">
          <li>{t("operate")}</li>
          <li>{t("reset")}</li>
          <li>{t("connected")}</li>
        </ul>
        { /* <!-- Visualization Section --> */}
        <h2 className="pt-5 py-3 font-monoCustom text-xl font-bold">📈 {t("visualization")}</h2>
        <ul className="ml-6 list-disc list-inside text-xl space-y-1">
          <li>{t("pan")}</li>
          <li>{t("rescale")}</li>
          <li>{t("hover")}</li>
          <li>{t("orbit")}</li>
          <li>{t("data")}</li>
        </ul>
      </div>
    </>
  )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////