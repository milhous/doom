'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {IRouterInfo} from '@libs/config/routers';

import './CompNav.scss';

// 导航链接
const CompNavItem = (props: {route: IRouterInfo; children: React.ReactNode}): JSX.Element => {
  const pathname = usePathname();
  const {route, children} = props;

  const [isActive, setActive] = useState<boolean>(false);

  useEffect(() => {
    const _isActive = pathname.startsWith(route.to);

    setActive(_isActive);
  }, []);

  return (
    <div className="header-nav_item">
      <Link href={route.to} className={isActive ? 'header-nav_link active' : 'header-nav_link'}>
        {children}
      </Link>
    </div>
  );
};

export default CompNavItem;
