import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend) // Load locales in public folder
  .use(initReactI18next)
  .init( {
    fallbackLng: 'fr',
    debug: true,
  })

export default i18n