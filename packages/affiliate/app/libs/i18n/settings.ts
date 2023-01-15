export type ILangType = 'en' | 'vi' | 'ja' | 'ko' | 'zh-Hans' | 'zh-Hant' | 'tr' | 'pt' | 'es';

export type ILangInfo = { lng: ILangType; alias: string; oldStandard: string };

/**
 * 区域语言
 * @param {string} type 类型
 * @param {number} q 权重 
 */
type ILocaleLng = {
    type: string;
    q: number;
}

export const lngConfigs: ILangInfo[] = [
    {lng: 'en', alias: 'English', oldStandard: 'en'},
    {lng: 'vi', alias: 'Tiếng Việt', oldStandard: 'vi'},
    {lng: 'ja', alias: '日本語', oldStandard: 'ja'},
    {lng: 'ko', alias: '한국어', oldStandard: 'ko'},
    {lng: 'tr', alias: 'Türkçe', oldStandard: 'tr'},
    {lng: 'pt', alias: 'Português', oldStandard: 'pt'},
    {lng: 'es', alias: 'Español', oldStandard: 'es'},
    {lng: 'zh-Hans', alias: '简体中文', oldStandard: 'zh-CN'},
    {lng: 'zh-Hant', alias: '繁體中文', oldStandard: 'zh-TW'},
];
  
// 支持语言列表
export const supportedLngs: string[] = lngConfigs.map(v => v.lng);

// cookie语言保存名称
export const cookieLngName = 'i18nextLng';

// 默认语言
export const defaultLng = 'en';

// 默认命名空间
export const defaultNS = 'common';

// 简繁体映射关系
const mapLngs: {[key: string]: string} = {
    'zh-CN': 'zh-Hans',
    'zh-TW': 'zh-Hant',
};

// 根据Accept Language获取区域语言
const getLocaleLngs = (acceptLng: string): ILocaleLng[] => {
    const lngs: string[] = acceptLng.split(',');

    const localeLngs: ILocaleLng[] = lngs.map((lng) => {
        const [lngType,lngQuality] = lng.split(';');
        let q = lngQuality?parseFloat(lngQuality.split('=')[1]):1;

        return {
            type: lngType
            ,q
        };
    }).sort((a, b) => b.q - a.q);

    return localeLngs;
};

// 获取当前语言


/**
 * 获取语言
 * @param {string} cookieLng cookie语言
 * @param {string} acceptLng header语言
 */
export const getLng = (cookieLng: string | undefined, acceptLng: string) => {
    let lng: string;

    if (!!cookieLng && supportedLngs.includes(cookieLng)) {
        lng = cookieLng;
    } else {
        const localeLngs: ILocaleLng[] = getLocaleLngs(acceptLng);

        for (const {type} of localeLngs) {
            if (supportedLngs.includes(type)) {
                lng = type;
            } else if (type in mapLngs) {
                lng = mapLngs['' + type];
            }
        }
    }

    if (!lng) {
        lng = defaultLng;
    }

    return lng;
};