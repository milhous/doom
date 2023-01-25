import {PackageType} from '@libs/config';
import routers from '@libs/config/routers';
import {useTranslate} from '@libs/i18n/server';

import CompNavItem from './CompNavItem';

import './CompNav.scss';

// 导航
const CompNav = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['common'], PackageType.UI);
  const betType = 0;
  const headerRouters = routers[betType];

  return (
    <nav className="ui-header_nav">
      {headerRouters.map((route, index) => (
        <CompNavItem key={index} route={route}>
          {t(route.name)}
        </CompNavItem>
      ))}
    </nav>
  );
};

export default CompNav;
