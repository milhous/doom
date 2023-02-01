'use client';

import {useState, useEffect} from 'react';

// i18n（解决水合冲突）
const WidgetTranslate = (props: {t: any; tkey: string}): JSX.Element => {
  const {t, tkey} = props;
  const [isPending, setPedding] = useState<boolean>(true);

  useEffect(() => {
    setPedding(false);
  }, []);

  return <>{!isPending && t(tkey)}</>;
};

export default WidgetTranslate;
