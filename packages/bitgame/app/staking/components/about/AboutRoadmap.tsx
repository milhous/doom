import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import './AboutRoadmap.scss';

// LUT發展路線
const AboutRoadmap = (): JSX.Element => {
  const {t} = useTranslate(['about', 'staking', 'error'], PackageType.STAKING);

  return (
    <section className="about-roadmap">
      <div className="staking-container">
        <h2>{t('roadmap_title')}</h2>
        <div>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time1')}
            </dt>
            <dd>{t('roadmap_desc1')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time2')}
            </dt>
            <dd>{t('roadmap_desc2')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time3')}
            </dt>
            <dd>{t('roadmap_desc3')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time4')}
            </dt>
            <dd>{t('roadmap_desc4')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time5')}
            </dt>
            <dd>{t('roadmap_desc5')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time6')}
            </dt>
            <dd>{t('roadmap_desc6')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time7')}
            </dt>
            <dd>{t('roadmap_desc7')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time8')}
            </dt>
            <dd>{t('roadmap_desc8')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time9')}
            </dt>
            <dd>{t('roadmap_desc9')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time10')}
            </dt>
            <dd>{t('roadmap_desc10')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time11')}
            </dt>
            <dd>{t('roadmap_desc11')}</dd>
          </dl>
          <dl>
            <dt>
              <i></i>
              {t('roadmap_time12')}
            </dt>
            <dd>{t('roadmap_desc12')}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default AboutRoadmap;
