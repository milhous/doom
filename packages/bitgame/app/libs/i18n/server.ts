import * as url from 'url';
import path from 'path';
import fs from 'fs-extra';

import {cookies, headers} from 'next/headers';
import {createInstance, i18n} from 'i18next';
import {initReactI18next} from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import {readDirInfo} from '@libs/utils/server';

import {defaultNS, supportedLngs, cookieLngName, getLng} from './settings';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.parse(__filename).dir;

// i18集合
const i18nMap = new Map<string, i18n>();
// 多语言资源集合
const localesMap = new Map<string, any>();

/**
 * 获取 Locales 路径
 * @param {string} appname app名称
 */
const getLocalesPath = (appname: string): string => {
  const localesPath = path.resolve(__dirname, `../../${appname}/locales`);

  return localesPath;
};

/**
 * 获取多语言资源
 * @param {string} appname app名称
 */
const getResources = (appname: string): any => {
  let res = {};

  if (localesMap.has(appname)) {
    res = localesMap.get(appname);
  } else {
    const localesPath = getLocalesPath(appname);
    const dirInfo = readDirInfo(`${localesPath}`);

    for (const lng of dirInfo) {
      res[lng] = getNSResources(lng, localesPath);
    }

    localesMap.set(appname, res);
  }

  return res;
};

/**
 * 获取对应语言资源
 * @param {string} lng 语言
 * @param {string} localesPath 语言根路径
 */
const getNSResources = (lng: string, localesPath: string): any => {
  const dirInfo = readDirInfo(`${localesPath}/${lng}`);
  const res = {};

  for (const file of dirInfo) {
    const data = fs.readJsonSync(`${localesPath}/${lng}/${file}`);
    const name = path.parse(file).name;

    res[name] = data;
  }

  return res;
};

/**
 * 初始化i18n
 * @param {string} appname app名称
 * @param {string} lng 语言
 */
const initI18next = (appname: string, lng: string): i18n => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance: i18n = createInstance();
  const bundledResources = getResources(appname);
  const ns = Object.keys(bundledResources[lng]);

  i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(bundledResources))
    .init({
      react: {transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span', 'a']},
      supportedLngs,
      lng,
      ns,
      defaultNS,
      load: 'currentOnly',
      interpolation: {
        escapeValue: false,
      },
      initImmediate: false,
    });

  return i18nInstance;
};

/**
 * 获取i18n instance
 * @param {string} appname app名称
 * @param {string} lng 语言
 */
const getI18nInstance = (appname: string, lng: string): i18n => {
  let i18nInstance: i18n;

  if (i18nMap.has(appname)) {
    i18nInstance = i18nMap.get(appname);
  } else {
    i18nInstance = initI18next(appname, lng);

    i18nMap.set(appname, i18nInstance);
  }

  return i18nInstance;
};

/**
 * hook - 多语言
 * @param {string | string[]} ns 命名空间
 * @param {string} appname app名称
 */
export const useTranslate = (ns: string | string[], appname: string) => {
  const nextCookies = cookies();
  const cookieLng = nextCookies.get(cookieLngName)?.value;
  const nextHeaders = headers();
  const acceptLng = nextHeaders.get('Accept-Language');
  const lng = getLng(cookieLng, acceptLng);

  const i18next = getI18nInstance(appname, lng);

  if (i18next.language !== lng) {
    i18next.changeLanguage(lng);
  }

  return {
    // TODO: solve TKPrefix problem here...
    t: i18next.getFixedT(lng, ns),
    i18n: i18next,
  };
};
