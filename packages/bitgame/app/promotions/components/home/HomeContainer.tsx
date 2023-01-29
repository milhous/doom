'use client';

import {useEffect, useState} from 'react';

import {PromotionsType} from '@libs/config';

import {IActivityData} from '@promotions/api';
import {useHome} from '@promotions/provider/HomeProvider';

import './HomeContainer.scss';

/**
 * 声明
 * @param {IActivityData[]} data 数据
 * @param {React.ReactNode} children 子节点
 */
interface IHomeListProps {
  data: IActivityData[];
  children: React.ReactNode;
}

// 根据类型筛选数据
const getClassname = (type: string, data: IActivityData[]): string => {
  let res = 'promotions-nodata';

  if (!Array.isArray(data) || data.length === 0) {
    return res;
  }

  if (PromotionsType[type] === PromotionsType.ALL) {
    res = 'promotions-' + type.toLowerCase();
  } else {
    const arr = data.filter((item: IActivityData) => PromotionsType[type] === Number(item.type));

    if (arr.length) {
      res = 'promotions-' + PromotionsType[type];
    }
  }

  return 'promotions-container ' + res;
};

// 活动容器
const HomeContainer = (props: IHomeListProps): JSX.Element => {
  const {data, children} = props;
  const {state} = useHome();
  // 活动列表
  const [classname, setClassname] = useState<string>(getClassname(state.promotionsType, data));

  useEffect(() => {
    setClassname(getClassname(state.promotionsType, data));
  }, [state]);

  return <div className={classname}>{children}</div>;
};

export default HomeContainer;
