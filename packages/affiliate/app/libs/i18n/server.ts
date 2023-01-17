import * as url from 'url';
import path from 'path';
import fs from 'fs-extra';

import { cookies, headers } from 'next/headers';
import { createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { defaultNS, supportedLngs, cookieLngName, getLng } from './settings';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.parse(__filename).dir;
const localesPath = path.resolve(__dirname, '../../locales');

const getResources = async (): Promise<any> => {
  const dirInfo = await fs.readdir(`${localesPath}`);
  const res = {};

  for (const lng of dirInfo) {
    res[lng] = await getNSResources(lng);
  }

  return res;
};

const getNSResources = async (lng: string): Promise<any> => {
  const dirInfo = await fs.readdir(`${localesPath}/${lng}`);
  const res = {};

  for (const file of dirInfo) {
    const data = await fs.readJson(`${localesPath}/${lng}/${file}`);
    const name = path.parse(file).name;

    res[name] = data;
  }

  return res;
}

const initI18next = async (lng: string) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  const bundledResources = await getResources();
  const ns = Object.keys(bundledResources[lng]);

  i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(bundledResources))
    .init({
      react: { transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span', 'a'] },
      supportedLngs,
      lng,
      ns,
      defaultNS,
      load: 'currentOnly',
      interpolation: {
        escapeValue: false,
      },
      initImmediate: false
    });
    
  return i18nInstance
}

export async function useTranslation(ns: string | string[]) {
  const nextCookies = cookies();
  const cookieLng = nextCookies.get(cookieLngName)?.value;
  const nextHeaders= headers();
  const acceptLng = nextHeaders.get('Accept-Language');
  const lng = getLng(cookieLng, acceptLng);

  const i18nextInstance = await initI18next(lng);

  return {
    // TODO: solve TKPrefix problem here...
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance
  }
}