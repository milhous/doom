import {Trans} from 'react-i18next/TransWithoutContext';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@app/affiliate/assets';

import './HomePlan.scss';

// 联盟计划
const HomePlan = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['affiliate'], PackageType.AFFILIATE);

  return (
    <section className="affiliate-plan">
      <article>
        <h3>{t('plan_title')}</h3>
        <p>
          <Trans t={t} i18nKey="plan_subtitle" values={{percent: '<span>7.8%</span>'}} />
        </p>
        <ul>
          <li>{t('plan_desc1')}</li>
          <li>{t('plan_desc2')}</li>
          <li>{t('plan_desc3')}</li>
          <li>
            <Trans t={t} i18nKey="plan_desc4" values={{reward: '<span>300 USDT</span>'}} />
          </li>
        </ul>
      </article>
      <aside>
        <dl>
          <dt>
            <Assets.HomePlanIcon1 />
          </dt>
          <dd>{t('plan_data1')}</dd>
        </dl>
        <dl>
          <dt>
            <Assets.HomePlanIcon2 className="plan-icon2" />
          </dt>
          <dd>{t('plan_data2')}</dd>
        </dl>
        <dl>
          <dt>
            <Assets.HomePlanIcon3 className="plan-icon3" />
          </dt>
          <dd>{t('plan_data3')}</dd>
        </dl>
        <dl>
          <dt>
            <Assets.HomePlanIcon4 className="plan-icon4" />
          </dt>
          <dd>{t('plan_data4')}</dd>
        </dl>
      </aside>
    </section>
  );
};

export default HomePlan;
