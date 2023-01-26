import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@staking/assets';

import './AboutBurning.scss';

// LUT代币销毁机制
const AboutBurning = async (props: {info: any}): Promise<JSX.Element> => {
  const {info} = props;
  const {totalBurning = 0} = info;
  const {t} = await useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  return (
    <section className="about-burning">
      <div className="staking-container">
        <div className="staking-box">
          <div className="staking-header">
            <h3>{t('burning_title')}</h3>
          </div>
          <div className="staking-content">
            <article>
              <p>{t('burning_desc')}</p>
              <dl>
                <dt>{t('burning_address')}</dt>
                <dd>0x000000000000000000000000000000000000dEaD</dd>
              </dl>
              <dl>
                <dt>{t('burning_total')}</dt>
                <dd>
                  <span>{totalBurning}</span>
                  <button type="button">{t('burning_btn')}</button>
                </dd>
              </dl>
            </article>
            <aside>
              <Assets.infoFlow />
              <Assets.infoFlowMobile />
            </aside>
          </div>
        </div>
      </div>
      {/* <LutDestroyRecord visible={visible} onClose={() => setVisible(false)} /> */}
    </section>
  );
};

export default AboutBurning;
