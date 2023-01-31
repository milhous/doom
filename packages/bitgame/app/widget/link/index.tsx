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
  children: React.ReactNode;
}): JSX.Element => {
  const pathname = usePathname();
  const {to, classname = '', highlight = false, children} = props;

  const [className, setClassName] = useState<string>(classname);
  const [query, setQuery] = useState<{ [propName: string]: any }>({});

  useEffect(() => {
    if (highlight) {
      const isActive = pathname.startsWith(to);

      isActive && setClassName(`${classname} active`);
    }

    setQuery({[cookieLngName]: getCurLang()});
  }, []);

  return (
    <Link
      href={{
        pathname: to,
        query,
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default WidgetLink;
