import {useTranslation} from '@app/libs/i18n/server';

import Assets from '@app/affiliate/assets';

import './HomeSupport.scss';

// 团队支持
const HomeSupport = async (): Promise<JSX.Element> => {
  const {t} = await useTranslation(['affiliate']);

  return (
    <section className="affiliate-support">
      <article>
        <h3>{t('support_title')}</h3>
        <ul>
          <li>{t('support_desc1')}</li>
          <li>{t('support_desc2')}</li>
          <li>{t('support_desc3')}</li>
        </ul>
        <a
          className="btn-background"
          href="https://agent.bitgame.com/"
          target="_blank"
          title={t('btn_background')}
          rel="noreferrer"
        >
          {t('btn_background')}
        </a>
      </article>
      <aside>
        <img src={Assets.homeSupportPic.src} />
      </aside>
    </section>
  );
};

export default HomeSupport;
