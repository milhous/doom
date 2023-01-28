'use client';

import {useEffect, useState} from 'react';

import {PromotionsType} from '@libs/config';

import {IActivityData} from '@promotions/api';
import {useHome} from '@promotions/provider/HomeProvider';

import HomeListItem from './HomeListItem';
import './HomeList.scss';

/**
 * 声明
 * @param {string} type 活动类型
 * @param {React.ReactNode} children 子节点
 */
interface IHomeListProps {
  data: IActivityData[];
  children: React.ReactNode;
}

// 根据类型筛选数据
const filter = (data: IActivityData[], type: string): IActivityData[] => {
  let res = [];

  if (!Array.isArray(data) || data.length === 0) {
    return res;
  }

  if (PromotionsType[type] === PromotionsType.ALL) {
    res = [...data];
  } else {
    res = data.filter((item: IActivityData) => PromotionsType[type] === Number(item.type));
  }

  return res;
};

// 活动列表
const HomeList = (props: IHomeListProps): JSX.Element => {
  const {data, children} = props;
  const {state, dispatch} = useHome();
  // 活动列表
  const [list, setList] = useState<IActivityData[]>(filter(data, state.promotionsType));

  useEffect(() => {
    setList(filter(data, state.promotionsType));
  }, [state]);

  return (
    <>
      {list.length > 0 ? (
        <ul className="promotions-list">
          {list.map((item: IActivityData, index: number) => {
            return <HomeListItem data={item} key={index} />;
          })}
        </ul>
      ) : (
        children
      )}
    </>
  );
};

export default HomeList;
