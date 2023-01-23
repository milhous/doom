'use client';

import {initReactI18next, useTranslation} from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import Cookies from 'js-cookie';

import {defaultNS, supportedLngs, cookieLngName, getLng} from './settings';

let i18n;

// 获取包名
const getPackageName = (): string => {
  let packageName = '';
  const elem = typeof document !== 'undefined' ? document.querySelector('main') : null;

  if (!!elem && packageName !== elem.id) {
    packageName = elem.id;
  }

  return packageName;
};

// 初始化
const initI18next = () => {
  const packageName = getPackageName();
  const cookieLng = Cookies.get(cookieLngName);
  const lng = getLng(cookieLng, '');

  i18n = i18next.createInstance();

  i18n
    // load translation using xhr -> see /public/locales
    .use(HttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options

    .init({
      react: {transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span', 'a']},
      supportedLngs,
      lng,
      ns: [] /* 'common' */,
      defaultNS,
      load: 'currentOnly',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      initImmediate: false,
      backend: {
        loadPath: `${__webpack_public_path__}static/locales/${packageName}/{{lng}}/{{ns}}.json`,
      },
      detection: {
        htmlTag: typeof document !== 'undefined' && document.documentElement,
        lookupCookie: cookieLngName,
        caches: ['cookie'],
        cookieMinutes: 60 * 24 * 365,
        cookieOptions: {path: '/', sameSite: false},
      },
    });
};

initI18next();

/**
 * 获取翻译文案
 * @param {string} key 翻译key
 * @param {string | boolean} nsSeparator 命名空间分隔符
 * @returns {string}
 */
export const getTranslate = (key: string, nsSeparator = ':'): string => {
  return i18n.t(key, {nsSeparator: nsSeparator});
};

/**
 * 获取 Translate Hook
 * @param {Array<string>} ns 命名空间
 * @returns {any}
 */
export const useTranslate = (ns: string[]): any => {
  const {t} = useTranslation(ns, {i18n});

  return {
    // TODO: solve TKPrefix problem here...
    t,
    i18n,
  };
};

/**
 * 切换语言
 * @param {string} lng 语言
 */
export const changeLang = (lng: string): void => {
  i18n.changeLanguage(lng);
};
