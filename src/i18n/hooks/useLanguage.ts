import { useTranslation } from 'react-i18next';
import type { Language } from '..';

export function useLanguage() {
    const { i18n, t } = useTranslation();

    const language = (i18n.resolvedLanguage ?? i18n.language) as Language;

    const setLanguage = (lng: Language) => {
        void i18n.changeLanguage(lng);
    };

    return { language, setLanguage, t };
}