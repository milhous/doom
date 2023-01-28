'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';

import {IActivityData} from '@promotions/api';

import './HomeListItem.scss';

/**
 * 活动状态
 * @param {number} beginTime 开始时间
 * @param {number} endTime 结束时间
 * @returns {number} state 0:未开始，1:进行中，2:结束
 */
const getPromotionState = (beginTime: number, endTime: number): number => {
  let state = 1;
  // 判断开始和结束时间
  const begin = new Date(parseInt('' + beginTime, 10));
  const end = new Date(parseInt('' + endTime, 10));
  const now = new Date();

  if (now < begin) {
    state = 0;
  } else if (now > end) {
    state = 2;
  } else {
    state = 1;
  }

  return state;
};

/**
 * 标识
 * @param {number} state 状态 0:未开始，1:进行中，2:结束
 * @param {number} type 类型 1:热门, 2:推荐
 */
const Tag = (props: {state: number; type: number}): JSX.Element => {
  const {state, type} = props;
  const {t} = useTranslate(['promotions'], PackageType.PROMOTIONS);
  let name = '';

  if (state === 2) {
    name = 'over';
  } else if (type === 1) {
    name = 'hot';
  } else if (type === 2) {
    name = 'top';
  }

  if (name !== '') {
    return (
      <strong className={`promotions-tag ${name}`}>
        <span>{t(name).toUpperCase()}</span>
      </strong>
    );
  } else {
    return <strong></strong>;
  }
};

// 元素
const HomeListItem = (props: {data: IActivityData}): JSX.Element => {
  const {data} = props;
  const {t} = useTranslate(['promotions'], PackageType.PROMOTIONS);

  const [promotionState, setPromotionState] = useState<number>(0);

  useEffect(() => {
    // 活动状态 0:未开始，1:进行中，2:结束
    const state = getPromotionState(data.startTime, data.endTime);

    setPromotionState(state);
  }, []);

  return (
    <li className="promotions-list_item">
      <div className="promotions-list_banner">
        <Image src={data.img} alt={data.title} width={1178} height={662} />
      </div>
      <div className="promotions-list_info">
        <h3>
          {data.title.toLocaleUpperCase()}
          {promotionState !== 0 && <Tag state={promotionState} type={data.tag} />}
        </h3>
        <p>{data.desc}</p>
        <ul className="promotions-list_btns">
          <li>
            <Link href={`/promotions/${data.id}`} className="promotions-btn promotions-btn_detail">
              {t('view_detail')}
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default HomeListItem;
