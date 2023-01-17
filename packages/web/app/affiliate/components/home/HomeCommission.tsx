import {Trans} from 'react-i18next/TransWithoutContext';

import {useTranslation} from '@app/libs/i18n/server';

import Assets from '@app/affiliate/assets';

import './HomeCommission.scss';

// 代理佣金
const HomeCommission = async (): Promise<JSX.Element> => {
  const {t} = await useTranslation(['affiliate']);

  return (
    <section className="affiliate-commission">
      <div>
        <aside>
          <dl>
            <dd>
              <img src={Assets.homeCommissionIcon1.src} className="commission-icon1" />
            </dd>
            <dt>Sports Betting</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.homeCommissionIcon2.src} className="commission-icon2" />
            </dd>
            <dt>In-house</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.homeCommissionIcon3.src} className="commission-icon3" />
            </dd>
            <dt>Casino</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.homeCommissionIcon4.src} className="commission-icon4" />
            </dd>
            <dt>Live Casino</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.homeCommissionIcon5.src} className="commission-icon5" />
            </dd>
            <dt>Table Games</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.homeCommissionIcon6.src} className="commission-icon6" />
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
