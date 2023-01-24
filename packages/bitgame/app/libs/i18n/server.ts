import * as url from 'url';
import path from 'path';
import fs from 'fs-extra';

import {cookies, headers} from 'next/headers';
import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import {defaultNS, supportedLngs, cookieLngName, getLng} from './settings';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.parse(__filename).dir;

// i18next instance
let i18n: any;
// 应用名称
let _appname = '';
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
 * 获取目录信息
 * @param {string} path 目录路径
 */
const readDirInfo = async (path: string): Promise<string[]> => {
  const reg = new RegExp(/\.DS_Store|node_modules$/);
  const isExist = await fs.pathExists(path);

  if (!isExist) {
    return [];
  }

  let dirInfo = await fs.readdir(path);

  dirInfo = dirInfo.filter((item: string) => {
    return !reg.test(item);
  });

  return dirInfo;
};

/**
 * 获取多语言资源
 * @param {string} appname app名称 
 */
const getResources = async (appname: string): Promise<any> => {
  let res = {};

  if (localesMap.has(appname)) {
    res = localesMap.get(appname);
  } else {
    const localesPath = getLocalesPath(appname);
    const dirInfo = await readDirInfo(`${localesPath}`);
  
    for (const lng of dirInfo) {
      res[lng] = await getNSResources(lng, localesPath);
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
const getNSResources = async (lng: string, localesPath: string): Promise<any> => {
  const dirInfo = await readDirInfo(`${localesPath}/${lng}`);
  const res = {};

  for (const file of dirInfo) {
    const data = await fs.readJson(`${localesPath}/${lng}/${file}`);
    const name = path.parse(file).name;

    res[name] = data;
  }

  return res;
};

/**
 * 初始化i18n
 * @param {string} lng 语言 
 * @param {string} appname app名称
 * @returns 
 */
const initI18next = async (lng: string, appname: string) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  const bundledResources = await getResources(appname);
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
 * 设置应用名称
 * @param {string} appname app名称
 */
export const setAppname = (appname: string) => {
  if (_appname !== appname) {
    i18n = null;
  }

  _appname = appname;
};

/**
 * hook - 多语言
 * @param {string | string[]} ns 命名空间
 */
export const useTranslate = async (ns: string | string[]) => {
  const nextCookies = cookies();
  const cookieLng = nextCookies.get(cookieLngName)?.value;
  const nextHeaders = headers();
  const acceptLng = nextHeaders.get('Accept-Language');
  const lng = getLng(cookieLng, acceptLng);

  if (!i18n) {
    i18n = await initI18next(lng, _appname);
  }

  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }

  return {
    // TODO: solve TKPrefix problem here...
    t: i18n.getFixedT(lng, ns),
    i18n,
  };
};
