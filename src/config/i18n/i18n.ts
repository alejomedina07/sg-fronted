import i18next from 'i18next';

import translationEn from '../../locale/en.json';
import translationEs from '../../locale/es.json';
import { initReactI18next } from 'react-i18next';

// const DEFAULT_LANGUAGE = 'es';
const DEFAULT_LANGUAGE = 'en';

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
};

i18next.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
});

export default i18next;
