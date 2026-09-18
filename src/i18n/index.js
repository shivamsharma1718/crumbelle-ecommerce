import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ─── English ──────────────────────────────────────────────
import enCommon   from './locales/en/common.json';
import enHome     from './locales/en/home.json';
import enProduct  from './locales/en/product.json';
import enAuth     from './locales/en/auth.json';
import enCart     from './locales/en/cart.json';
import enCheckout from './locales/en/checkout.json';
import enAccount  from './locales/en/account.json';
import enContact  from './locales/en/contact.json';
import enAbout    from './locales/en/about.json';
import enNotFound from './locales/en/notFound.json';
import enBlog     from './locales/en/blog.json';

// ─── Hindi ────────────────────────────────────────────────
import hiCommon   from './locales/hi/common.json';
import hiHome     from './locales/hi/home.json';
import hiProduct  from './locales/hi/product.json';
import hiAuth     from './locales/hi/auth.json';
import hiCart     from './locales/hi/cart.json';
import hiCheckout from './locales/hi/checkout.json';
import hiAccount  from './locales/hi/account.json';
import hiContact  from './locales/hi/contact.json';
import hiAbout    from './locales/hi/about.json';
import hiNotFound from './locales/hi/notFound.json';
import hiBlog     from './locales/hi/blog.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common:   enCommon,
        home:     enHome,
        product:  enProduct,
        auth:     enAuth,
        cart:     enCart,
        checkout: enCheckout,
        account:  enAccount,
        contact:  enContact,
        about:    enAbout,
        notFound: enNotFound,
        blog:     enBlog,
      },
      hi: {
        common:   hiCommon,
        home:     hiHome,
        product:  hiProduct,
        auth:     hiAuth,
        cart:     hiCart,
        checkout: hiCheckout,
        account:  hiAccount,
        contact:  hiContact,
        about:    hiAbout,
        notFound: hiNotFound,
        blog:     hiBlog,
      },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'madhab_lang',
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
