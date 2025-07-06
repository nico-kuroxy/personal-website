/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file sets up the configuration for Next and NextIntl.
//          For NextIntl, it has been inspired by this tutorial : https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing. 
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries.
import createNextIntlPlugin from 'next-intl/plugin';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> CONFIGURATIONS.
// Define the NextIntl configuration.
const withNextIntl = createNextIntlPlugin({
  // The configuration option.
  messages: {
    en: () => import('./messages/en.json'),
    fr: () => import('./messages/fr.json')
  }
})
// Define the Next configuration.
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove experimental block entirely
    output: 'standalone',
    distDir: 'client/out'
}
// Export the config.
export default withNextIntl(nextConfig);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
