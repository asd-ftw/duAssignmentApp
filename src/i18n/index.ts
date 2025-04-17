import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const fallbackLng = 'en';

// const languageDetector = {
//   type: 'languageDetector' as const,
//   async: true,
//   detect: (cb: (lang: string) => void) => {
//     const locales = RNLocalize.getLocales();
//     const bestLang = locales.find(locale =>
//       Object.keys(resources).includes(locale.languageTag),
//     );
//     cb(bestLang?.languageTag ?? fallbackLng);
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

i18n
  // .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: fallbackLng,
    fallbackLng,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
