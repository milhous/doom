import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@staking/assets';

import './AboutUsage.scss';

// LUT代币使用場景
const AboutUsage = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  return (
    <section className="about-usage">
      <div className="staking-container">
        <h2>{t('usage_title')}</h2>
        <ul>
          <li>
            <a href="/staking/dividends" title={t('usage_desc1')}>
              <div>
                <Assets.aboutIcon1 />
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
                <Assets.aboutIcon2 />
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
                <Assets.aboutIcon3 />
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
                <Assets.aboutIcon4 />
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
