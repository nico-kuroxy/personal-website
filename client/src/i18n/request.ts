/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the request to set the locale.
//          Inspired by this tutorial : https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing. 
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> NEXT INTERNATIONAL CONFIG.
// Define the function that will be called with getLocale() / getMessages().
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  const cookieStore = cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////