import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import './AboutContact.scss';

// Telegram
const telegramList = {
  ja: 'https://t.me/Bitgame_JP',
  ko: 'https://t.me/Bitgame_KR',
  vi: 'https://t.me/Bitgame_VN',
  'zh-Hans': 'https://t.me/Bitgame_CN',
  'zh-Hant': 'https://t.me/Bitgame_CN',
  en: 'https://t.me/Bitgame_EN',
  tr: 'https://t.me/Bitgame_EN',
  pt: 'https://t.me/Bitgame_EN',
  es: 'https://t.me/Bitgame_EN',
};

// 成為LUT參與者
const AboutContact = async (): Promise<JSX.Element> => {
  const {t, i18n} = await useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  return (
    <section className="about-contact">
      <div className="staking-container">
        <h2>{t('contact_title')}</h2>
        <p>{t('contact_desc')}</p>
        <a
          className="staking-btn"
          href={telegramList[i18n.language]}
          target="_blank"
          title={t('contact_btn')}
          rel="noreferrer"
        >
          {t('contact_btn')}
        </a>
      </div>
    </section>
  );
};

export default AboutContact;
