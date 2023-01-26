'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {cookieLngName} from '@app/libs/i18n/settings';
import {getCurLang} from '@libs/i18n/client';

// 链接
const WidgetLink = (props: {
  to: string;
  classname?: string;
  highlight?: boolean;
  fn?: (isActive: boolean) => string;
  children: React.ReactNode;
}): JSX.Element => {
  const pathname = usePathname();
  const {to, classname = '', highlight = false, children} = props;

  const [className, setClassName] = useState<string>(classname);

  useEffect(() => {
    if (highlight) {
      const isActive = pathname.startsWith(to);

      isActive && setClassName(`${classname} active`);
    }
  }, []);

  return (
    <Link
      href={{
        pathname: to,
        query: {[cookieLngName]: getCurLang()},
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default WidgetLink;
