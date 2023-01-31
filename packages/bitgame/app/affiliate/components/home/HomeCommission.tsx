import {Trans} from 'react-i18next/TransWithoutContext';
import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@app/affiliate/assets';

import './HomeCommission.scss';

// 代理佣金
const HomeCommission = ():JSX.Element => {
  const {t} = useTranslate(['affiliate'], PackageType.AFFILIATE);

  return (
    <section className="affiliate-commission">
      <div>
        <aside>
          <dl>
            <dd>
              <Image
                className="commission-icon1"
                src={Assets.homeCommissionIcon1.src}
                alt="Sports Betting"
                width={Assets.homeCommissionIcon1.width}
                height={Assets.homeCommissionIcon1.height}
              />
            </dd>
            <dt>Sports Betting</dt>
          </dl>
          <dl>
            <dd>
              <Image
                className="commission-icon2"
                src={Assets.homeCommissionIcon2.src}
                alt="In-house"
                width={Assets.homeCommissionIcon2.width}
                height={Assets.homeCommissionIcon2.height}
              />
            </dd>
            <dt>In-house</dt>
          </dl>
          <dl>
            <dd>
              <Image
                className="commission-icon3"
                src={Assets.homeCommissionIcon3.src}
                alt="Casino"
                width={Assets.homeCommissionIcon3.width}
                height={Assets.homeCommissionIcon3.height}
              />
            </dd>
            <dt>Casino</dt>
          </dl>
          <dl>
            <dd>
              <Image
                className="commission-icon4"
                src={Assets.homeCommissionIcon4.src}
                alt="Live Casino"
                width={Assets.homeCommissionIcon4.width}
                height={Assets.homeCommissionIcon4.height}
              />
            </dd>
            <dt>Live Casino</dt>
          </dl>
          <dl>
            <dd>
              <Image
                className="commission-icon5"
                src={Assets.homeCommissionIcon5.src}
                alt="Table Games"
                width={Assets.homeCommissionIcon5.width}
                height={Assets.homeCommissionIcon5.height}
              />
            </dd>
            <dt>Table Games</dt>
          </dl>
          <dl>
            <dd>
              <Image
                className="commission-icon6"
                src={Assets.homeCommissionIcon6.src}
                alt="Virtual Sports"
                width={Assets.homeCommissionIcon6.width}
                height={Assets.homeCommissionIcon6.height}
              />
            </dd>
            <dt>Virtual Sports</dt>
          </dl>
        </aside>
        <article>
          <h3>
            <Trans t={t} i18nKey="commission_title" values={{percent: '<span>50%</span>'}} />
          </h3>
          <ul>
            <li>{t('commission_desc1')}</li>
            <li>
              <Trans t={t} i18nKey="commission_desc2" values={{percent: '<span>10%</span>'}} />
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default HomeCommission;
