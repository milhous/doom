import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@app/affiliate/assets';

import './HomeRights.scss';

// 专属权益
const HomeRights = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['affiliate'], PackageType.AFFILIATE);

  return (
    <section className="affiliate-rights">
      <div>
        <aside>
          <Image
            src={Assets.homeRightsPic.src}
            alt=""
            width={Assets.homeRightsPic.width}
            height={Assets.homeRightsPic.height}
          />
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
