import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Image from 'next/image';

import Assets from '@app/affiliate/assets';

import './HomeSupport.scss';

// 团队支持
const HomeSupport = ():JSX.Element => {
  const {t} = useTranslate(['affiliate'], PackageType.AFFILIATE);

  return (
    <section className="affiliate-support">
      <article>
        <h3>{t('support_title')}</h3>
        <ul>
          <li>{t('support_desc1')}</li>
          <li>{t('support_desc2')}</li>
          <li>{t('support_desc3')}</li>
        </ul>
        <a
          className="btn-background"
          href="https://agent.bitgame.com/"
          target="_blank"
          title={t('btn_background')}
          rel="noreferrer"
        >
          {t('btn_background')}
        </a>
      </article>
      <aside>
        <Image
          src={Assets.homeSupportPic.src}
          alt=""
          width={Assets.homeSupportPic.width}
          height={Assets.homeSupportPic.height}
        />
      </aside>
    </section>
  );
};

export default HomeSupport;
