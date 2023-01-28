import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import {PromotionsType} from '@libs/config';

import Assets from '@promotions/assets';
import HomeNavItem from './HomeNavItem';

import './HomeNav.scss';

// 导航
const HomeNav = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['promotions'], PackageType.PROMOTIONS);

  const items = [];

  for (const type in PromotionsType) {
    if (Number.isNaN(Number(type))) {
      const capitalized = type.charAt(0) + type.toLowerCase().slice(1);
      const NavIcon = Assets['Icon' + capitalized];
      const NavIconActive = Assets[`Icon${capitalized}Active`];

      items.push(
        <HomeNavItem key={type} type={type}>
          <NavIcon />
          <NavIconActive />
          <span>{t(type.toLocaleLowerCase())}</span>
        </HomeNavItem>,
      );
    }
  }

  return (
    <nav className="promotions-nav">
      <ul>{items}</ul>
    </nav>
  );
};

export default HomeNav;
