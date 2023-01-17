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
let localesPath = '';

/**
 * 设置 Locales 路径
 * @param {string} appName APP名称
 */
export const setLocalesPath = (appName: string) => {
  localesPath = path.resolve(__dirname, `../../${appName}/locales`);
};

/**
 * 获取目录信息
 * @param {string} path 目录路径
 */
export const readDirInfo = async (path: string): Promise<string[]> => {
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

const getResources = async (): Promise<any> => {
  const dirInfo = await readDirInfo(`${localesPath}`);
  const res = {};

  for (const lng of dirInfo) {
    res[lng] = await getNSResources(lng);
  }

  return res;
};

const getNSResources = async (lng: string): Promise<any> => {
  const dirInfo = await readDirInfo(`${localesPath}/${lng}`);
  const res = {};

  for (const file of dirInfo) {
    const data = await fs.readJson(`${localesPath}/${lng}/${file}`);
    const name = path.parse(file).name;

    res[name] = data;
  }

  return res;
};

const initI18next = async (lng: string) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  const bundledResources = await getResources();
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

export async function useTranslation(ns: string | string[]) {
  const nextCookies = cookies();
  const cookieLng = nextCookies.get(cookieLngName)?.value;
  const nextHeaders = headers();
  const acceptLng = nextHeaders.get('Accept-Language');
  const lng = getLng(cookieLng, acceptLng);

  const i18nextInstance = await initI18next(lng);

  return {
    // TODO: solve TKPrefix problem here...
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance,
  };
}
