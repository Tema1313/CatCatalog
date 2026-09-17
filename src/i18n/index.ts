import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';


export type Language = 'en' | 'ru';

export const SUPPORTED_LANGS: Language[] = ["en", 'ru']

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ru: { translation: ru }
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS,
    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'e-cat-catalog-language'
    }
})

export default i18n