import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@staking/assets';

import './AboutUsage.scss';

// LUT代币使用場景
const AboutUsage = (): JSX.Element => {
  const {t} = useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  return (
    <section className="about-usage">
      <div className="staking-container">
        <h2>{t('usage_title')}</h2>
        <ul>
          <li>
            <a href="/staking/dividends" title={t('usage_desc1')}>
              <div>
                <Image
                  src={Assets.aboutIcon1.src}
                  alt=""
                  width={Assets.aboutIcon1.width}
                  height={Assets.aboutIcon1.height}
                />
              </div>
              <dl>
                <dt>{t('usage_desc1')}</dt>
                <dd>&nbsp;</dd>
              </dl>
              <Assets.usageArrow />
            </a>
          </li>
          <li>
            <a href="/staking/bidding" title={t('usage_desc2')}>
              <div>
                <Image
                  src={Assets.aboutIcon2.src}
                  alt=""
                  width={Assets.aboutIcon2.width}
                  height={Assets.aboutIcon2.height}
                />
              </div>
              <dl>
                <dt>{t('usage_desc2')}</dt>
                <dd>&nbsp;</dd>
              </dl>
              <Assets.usageArrow />
            </a>
          </li>
          <li>
            <a href="/match" title={t('usage_desc3')}>
              <div>
                <Image
                  src={Assets.aboutIcon3.src}
                  alt=""
                  width={Assets.aboutIcon3.width}
                  height={Assets.aboutIcon3.height}
                />
              </div>
              <dl>
                <dt>{t('usage_desc3')}</dt>
                <dd>{t('usage_tips')}</dd>
              </dl>
              <Assets.usageArrow />
            </a>
          </li>
          <li>
            <a href="/promotions" title={t('usage_desc4')}>
              <div>
                <Image
                  src={Assets.aboutIcon4.src}
                  alt=""
                  width={Assets.aboutIcon4.width}
                  height={Assets.aboutIcon4.height}
                />
              </div>
              <dl>
                <dt>{t('usage_desc4')}</dt>
                <dd>{t('usage_tips')}</dd>
              </dl>
              <Assets.usageArrow />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutUsage;
