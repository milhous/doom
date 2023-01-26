import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@staking/assets';

import './AboutBanner.scss';

// Banner
const AboutBanner = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  return (
    <section className="about-banner">
      <div className="staking-container">
        <dl>
          <dt>{t('staking:about_lut')}</dt>
          <dd>{t('banner_desc')}</dd>
        </dl>
        <Image src={Assets.banner.src} alt="" width={Assets.banner.width} height={Assets.banner.height} />
      </div>
    </section>
  );
};

export default AboutBanner;
