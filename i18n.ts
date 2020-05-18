import ICU from 'i18next-icu';
import en from 'i18next-icu/locale-data/en';
import vi from 'i18next-icu/locale-data/vi';
import NextI18next from 'next-i18next';
import _ from 'lodash';
import { NextComponentType, NextPageContext } from 'next';
import { useTranslation as originalUseTranslation } from 'react-i18next';

// tslint:disable-next-line:no-any
const use: any[] = [];
const icu = new ICU({});
icu.addLocaleData(vi);
icu.addLocaleData(en);

use.push(icu);

let detectionOrder: string[] = [];

const i18nextMiddleware = require('i18next-express-middleware');
const languageDetector = new i18nextMiddleware.LanguageDetector(undefined, {
  order: ['enforcedLocale', 'languageByDomain'],
});

languageDetector.addDetector({
  name: 'enforcedLocale',
  lookup: () => 'vi',
  cacheUserLanguage: _.noop,
});

languageDetector.addDetector({
  name: 'languageByDomain',
  lookup: () => vi,
  cacheUserLanguage: _.noop,
});
use.push(languageDetector);
detectionOrder = ['enforcedLocale', 'languageByDomain'];

const nextI18nextInstance = new NextI18next({
  use,
  browserLanguageDetection: false,
  defaultLanguage: 'vi',
  // defaultNS: 'common',
  detection: { order: detectionOrder },
  fallbackLng: 'vi',
  keySeparator: '###',
  localePath: 'static/locales',
  otherLanguages: ['vi', 'en'],
  localeSubpaths: {
    vi: 'vi',
    en: 'en',
  },
});

nextI18nextInstance.i18n.languages = ['vi', 'en'];

export const nextI18next = nextI18nextInstance;

export const includeDefaultNamespaces = (namespaces: string[]) =>
  ['common', 'home', 'footer', 'account'].concat(namespaces);

export const appWithTranslation = nextI18next.appWithTranslation;
export const Trans = nextI18next.Trans;
export const useTranslation = originalUseTranslation;
export type I18nPage<P = {}> = NextComponentType<
  NextPageContext,
  { namespacesRequired: string[] },
  P & { namespacesRequired: string[] }
>;
export const Link = nextI18next.Link;
export const withTranslation = nextI18next.withTranslation;
export const Router = nextI18next.Router;
export const i18n = nextI18next.i18n;
