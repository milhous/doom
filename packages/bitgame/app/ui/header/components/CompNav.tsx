import {PackageType} from '@libs/config';
import routers, {IRouterInfo} from '@libs/config/routers';
import {useTranslate} from '@libs/i18n/server';
import WidgetLink from '@widget/link';

import './CompNav.scss';

// 导航
const CompNav = (): JSX.Element => {
  const {t} = useTranslate(['common'], PackageType.UI);
  const betType = 0;
  const headerRouters = routers[betType];

  return (
    <nav className="ui-header_nav">
      {headerRouters.map((route: IRouterInfo) => (
        <div className="header-nav_item" key={route.to}>
          <WidgetLink to={route.to} classname="header-nav_link" highlight={true}>
            {t(route.name)}
          </WidgetLink>
        </div>
      ))}
    </nav>
  );
};

export default CompNav;
