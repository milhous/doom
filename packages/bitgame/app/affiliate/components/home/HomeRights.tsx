import {useTranslate} from '@libs/i18n/server';

import Assets from '@app/affiliate/assets';

import './HomeRights.scss';

// 专属权益
const HomeRights = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['affiliate']);

  return (
    <section className="affiliate-rights">
      <div>
        <aside>
          <img src={Assets.homeRightsPic.src} />
        </aside>
        <article>
          <h3>{t('rights_title')}</h3>
          <p>{t('rights_subtitle')}</p>
          <ul>
            <li>{t('rights_desc1')}</li>
            <li>{t('rights_desc2')}</li>
            <li>{t('rights_desc3')}</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default HomeRights;
