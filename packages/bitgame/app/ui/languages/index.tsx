'use client';

import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';

import {lngConfigs, cookieLngName} from '@libs/i18n/settings';
import {getCurLang, changeLang} from '@libs/i18n/client';
import WidgetDropdown from '@widget/dropdown';

// 获取语言列表
const getLangsList = () => {
  const list = [];

  for (const {lng, alias} of lngConfigs) {
    list.push({
      val: lng,
      desc: alias,
    });
  }

  return list;
};

// footer
const UILanguages = (): JSX.Element => {
  const router = useRouter();
  const list = getLangsList();
  const selected = getCurLang();

  const handleSelect = (data: IWidgetDropdownList): void => {
    const lng = data.val;
    changeLang(lng);

    Cookies.set(cookieLngName, lng);

    router.refresh();
  };

  return <WidgetDropdown list={list} selected={selected} onSelect={handleSelect} />;
};

export default UILanguages;
