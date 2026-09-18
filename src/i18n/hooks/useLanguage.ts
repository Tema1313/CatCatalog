import { useTranslation } from 'react-i18next';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type { Language } from '..';

export function useLanguage() {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const search = useSearch({ strict: false }) as Record<string, unknown>;

    const language = (i18n.resolvedLanguage ?? i18n.language) as Language;

    const setLanguage = (lng: Language) => {
        i18n.changeLanguage(lng);
        navigate({
            // @ts-expect-error
            search: { ...search, locale: lng },
            replace: true,
        });
    };

    return { language, setLanguage, t };
}