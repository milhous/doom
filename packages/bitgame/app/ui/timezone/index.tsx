'use client';

import {useEffect, useState} from 'react';

import {PackageType} from '@libs/config';
import {useTranslate, getTranslate} from '@libs/i18n/client';
import {TimeZoneConfigs, useTimezone, changeTimezone} from '@libs/timezone';
import WidgetDropdown from '@widget/dropdown';

// 获取时区列表
const getTimezonesList = (): IWidgetDropdownList[] => {
  const list = [];

  for (const key in TimeZoneConfigs) {
    const desc = getTranslate(`timezone@${key}`, PackageType.UI, '@');

    list.push({
      val: key,
      desc,
    });
  }

  return list;
};

// Timezone
const UITimezone = (): JSX.Element => {
  const {t} = useTranslate(['timezone'], PackageType.UI);
  const selected = useTimezone();
  const [list, setList] = useState<IWidgetDropdownList[]>([]);

  // 选择
  const handleSelect = (data: IWidgetDropdownList): void => {
    changeTimezone(data.val);
  };

  useEffect(() => {
    const timezonesList = getTimezonesList();

    setList(timezonesList);
  }, [t]);

  return <WidgetDropdown list={list} selected={selected} showTips={true} onSelect={handleSelect} />;
};

export default UITimezone;
