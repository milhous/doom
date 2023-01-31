'use client';

import {initReactI18next, useTranslation} from 'react-i18next';
import i18next, {i18n} from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import FetchBackend from 'i18next-fetch-backend';
import Cookies from 'js-cookie';

import {defaultNS, defaultLng, supportedLngs, cookieLngName, getLng} from './settings';

// i18集合
const i18nMap = new Map<string, i18n>();

/**
 * 初始化i18n
 * @param {string} appname app名称
 */
const initI18next = (appname: string): i18n => {
  const cookieLng = Cookies.get(cookieLngName);
  const lng = getLng(cookieLng, '');
  const loadPath = `${__webpack_public_path__}static/locales/${appname}/{{lng}}/{{ns}}.json`;

  const i18nInstance: i18n = i18next.createInstance();

  i18nInstance
    // load translation using xhr -> see /public/locales
    // .use(HttpBackend)
    .use(FetchBackend)
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
        loadPath,
      },
      detection: {
        htmlTag: typeof document !== 'undefined' && document.documentElement,
        lookupCookie: cookieLngName,
        caches: ['cookie'],
        cookieMinutes: 60 * 24 * 365,
        cookieOptions: {path: '/', sameSite: false},
      },
    });

  return i18nInstance;
};

/**
 * 获取i18n instance
 * @param {string} appname app名称
 */
const getI18nInstance = (appname: string): i18n => {
  let i18nInstance: i18n;

  if (i18nMap.has(appname)) {
    i18nInstance = i18nMap.get(appname);
  } else {
    i18nInstance = initI18next(appname);

    i18nMap.set(appname, i18nInstance);
  }

  return i18nInstance;
};

/**
 * 获取当前语言
 * @returns {string}
 */
export const getCurLang = (): string => {
  const lng = Cookies.get(cookieLngName) || defaultLng;

  if (supportedLngs.find(v => v === lng)) {
    return lng;
  } else {
    return defaultLng;
  }
};

/**
 * 获取翻译文案
 * @param {string} key 翻译key
 * @param {string} appname app名称
 * @param {string | boolean} nsSeparator 命名空间分隔符
 * @returns {string}
 */
export const getTranslate = (key: string, appname: string, nsSeparator = ':'): string => {
  const i18next = getI18nInstance(appname);

  return i18next.t(key, {nsSeparator: nsSeparator});
};

/**
 * hook - 多语言
 * @param {Array<string>} ns 命名空间
 * @param {string} appname app名称
 * @returns {any}
 */
export const useTranslate = (ns: string[], appname: string): any => {
  const i18next = getI18nInstance(appname);
  const { t } = useTranslation(ns, { i18n: i18next });

  return {
    // TODO: solve TKPrefix problem here...
    t,
    i18n: i18next,
  };
};

/**
 * 切换语言
 * @param {string} lng 语言
 */
export const changeLang = (lng: string): void => {
  for (const i18next of i18nMap.values()) {
    i18next.changeLanguage(lng);
  }
};
