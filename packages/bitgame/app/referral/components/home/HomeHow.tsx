import {Trans} from 'react-i18next/TransWithoutContext';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import {getInvitationInfo} from '@referral/api';
import Assets from '@referral/assets';

import './HomeHow.scss';

async function getData() {
  const res = await getInvitationInfo();

  return res;
}

const HomeHow = async (): Promise<JSX.Element> => {
  const {t} = useTranslate(['referral'], PackageType.REFERRAL);

  const data = await getData();
  const {betDivisor, lutPrize, rebateAmount, rebateLimit} = data;

  return (
    <section className="referral-how">
      <h3>{t('how_title')}</h3>
      <p>{t('how_desc1')}</p>
      <p>{t('how_desc2')}</p>
      <div className="how-list">
        <ul>
          <li>
            <div>
              <Assets.HomeIconSN1 className="icon-sn" />
              <Assets.HomeIconLink className="icon-link" />
            </div>
            <dl>
              <dt>{t('how_subtitle1')}</dt>
              <dd>{t('how_subdesc1')}</dd>
            </dl>
          </li>
          <li>
            <div>
              <Assets.HomeIconSN2 className="icon-sn" />
              <Assets.HomeIconPeople className="icon-people" />
            </div>
            <dl>
              <dt>{t('how_subtitle2')}</dt>
              <dd>
                <Trans t={t} i18nKey="how_subdesc2" values={{lutPrize: `<strong>${lutPrize} LUT</strong>`}} />
              </dd>
            </dl>
          </li>
          <li>
            <div>
              <Assets.HomeIconSN3 className="icon-sn" />
              <Assets.HomeIconUsdt className="icon-usdt" />
            </div>
            <dl>
              <dt>{t('how_subtitle3')}</dt>
              <dd>
                <Trans
                  t={t}
                  i18nKey="how_subdesc3"
                  values={{
                    betDivisor: `${betDivisor} USDT`,
                    rebateLimit: `<strong>${rebateLimit} USDT</strong>`,
                    rebateAmount: `<strong>${rebateAmount} USDT</strong>`,
                  }}
                />
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomeHow;
