import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@staking/assets';

import AboutInfoChart from './AboutInfoChart';
import './AboutInfo.scss';

// LUT情报
const AboutInfo = async (props: {info: any}): Promise<JSX.Element> => {
  const {info} = props;
  const {t, i18n} = await useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  const {ownerNumber = 0, miningPoolTotal = 0, miningMaxPool = 0} = info;
  const lng = i18n.language;
  // 饼图数据
  const chartData = [0.1, 0.1, 0.1, 0.7];

  return (
    <section className="about-info">
      <div className="staking-container">
        <h2>{t('info_title')}</h2>
        <div className="staking-box">
          <aside>
            <div className="chart">
              <AboutInfoChart chartData={chartData} />
              <dl>
                <dt>{t('detail_circulation')}</dt>
                <dd>{miningMaxPool}</dd>
                <dd>LUT</dd>
              </dl>
            </div>
            <ul>
              <li>
                <strong>{t('detail_rewards')}</strong>
                <span className="green">{chartData[0] * 100}%</span>
              </li>
              <li>
                <strong>{t('detail_build')}</strong>
                <span className="orange">{chartData[1] * 100}%</span>
              </li>
              <li>
                <strong>{t('detail_pool')}</strong>
                <span className="red">{chartData[2] * 100}%</span>
              </li>
              <li>
                <strong>{t('detail_staking')}</strong>
                <span className="blue">{chartData[3] * 100}%</span>
              </li>
            </ul>
          </aside>
          <article>
            <dl>
              <dt>{t('detail_circulation')}</dt>
              <dd>1000000000</dd>
            </dl>
            <dl>
              <dt>{lng == 'tr' ? 'Blok Zincir' : 'Chain'}</dt>
              <dd>Ethereum Request for Comments 20</dd>
            </dl>
            <dl>
              <dt>{t('detail_token')}</dt>
              <dd>
                0xcaA49E39Ae9471Ae73dE1E325bbd6FEBfc95E4D6
                <a
                  href="https://etherscan.io/address/0xcaA49E39Ae9471Ae73dE1E325bbd6FEBfc95E4D6"
                  target="_blank"
                  title={t('detail_token')}
                  rel="noreferrer"
                >
                  <Assets.infoBtnScan />
                </a>
              </dd>
            </dl>
            <dl>
              <dt>{t('detail_condition')}</dt>
              <dd className="fixed">{t('detail_condition_desc')}</dd>
            </dl>
            <dl>
              <dt>{t('detail_supply')}</dt>
              <dd>
                <span>{miningPoolTotal}</span>
              </dd>
            </dl>
            <dl>
              <dt>{t('detail_holders')}</dt>
              <dd>{ownerNumber}</dd>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
