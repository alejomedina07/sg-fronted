import i18next from 'i18next';

import translationEn from '../../locale/en.json';
import translationEs from '../../locale/es.json';
import translationFr from '../../locale/fr.json';
import translationPt from '../../locale/pt.json';
import { initReactI18next } from 'react-i18next';

const languageDefault = localStorage.getItem('languageDefault') || 'en';

const DEFAULT_LANGUAGE = languageDefault;
// const DEFAULT_LANGUAGE = 'en';

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
  fr: { translation: translationFr },
  pt: { translation: translationPt },
};

i18next.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
});

export default i18next;
