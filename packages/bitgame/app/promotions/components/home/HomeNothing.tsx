import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@promotions/assets';

import './HomeNothing.scss';

// 暂无数据
const HomeNothing = (): JSX.Element => {
  const {t} = useTranslate(['promotions'], PackageType.PROMOTIONS);

  return (
    <div className="promotions-nothing">
      <Assets.IconNothing />
      <span>{t('stay_tuned')}</span>
    </div>
  );
};

export default HomeNothing;
