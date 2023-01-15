// import {useTranslate} from '@libs/i18n';

import { useTranslation } from '@app/libs/i18n/server';

import './HomeBanner.scss';

// 代理banner
const HomeBanner = async (): Promise<JSX.Element> => {
  const { t } = await useTranslation(['affiliate']);

  return (
    <section className="affiliate-banner">
      <dl>
        <dt>GET READY TO START EARNING WITH BITGAME.COM</dt>
        <dd>{t('banner_title')}</dd>
      </dl>
      <a className="btn-apply" href="mailto:support@bitgame.com" title="support@bitgame.com">
        {t('btn_apply')}
      </a>
    </section>
  );
};

export default HomeBanner;
