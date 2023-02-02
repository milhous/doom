'use client';

import {useState, useEffect} from 'react';

// i18n（解决水合冲突）
const WidgetTranslate = (props: {i18nT: any; i18nKey: string}): JSX.Element => {
  const {i18nT, i18nKey} = props;
  const [isPending, setPedding] = useState<boolean>(true);

  useEffect(() => {
    setPedding(false);
  }, []);

  return <>{!isPending && i18nT(i18nKey)}</>;
};

export default WidgetTranslate;
