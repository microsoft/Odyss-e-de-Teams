import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import * as microsoftTeams from "@microsoft/teams-js";

microsoftTeams.initialize(()=>{
  console.log('Go Teams')
  microsoftTeams.getContext((context)=>{

    i18n
      .init({
        react: {
          useSuspense: false
        },
        fallbackLng: 'en',
        lng: context.locale.toLocaleLowerCase().slice(0,3) === "fr-" ? "fr" : "en",
        debug: true,
      })
  
    })
  })

i18n
  .use(Backend) // Load locales in public folder
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false
    },
    fallbackLng: 'en',
    lng: navigator.language.toLocaleLowerCase() === "fr-fr" || navigator.language === "fr" ? "fr" : "en",
    debug: true,
  })

export default i18n