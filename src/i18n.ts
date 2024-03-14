import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGES } from './utils/constants/common.constant';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        returnEmptyString: false,
        supportedLngs: LANGUAGES.map((lang) => lang.key),
        cache: ['cookie'],
        interpolation: {
            escapeValue: false,
        },
        backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    })
    .then(() => null)
    .catch(() => null);

export { i18n };
