'use client';

import {useRef} from 'react';

import {useHome} from '@promotions/provider/HomeProvider';
import {PromotionsReducerEventType} from '@promotions/provider/homeReducer';

/**
 * 声明
 * @param {string} type 活动类型
 * @param {React.ReactNode} children 子节点
 */
interface IHomeNavItemProps {
  type: string;
  children: React.ReactNode;
}

// 获取左间距
const getOffsetLeft = (item: HTMLLIElement | null): number => {
  let offsetLeft = 0;

  if (item) {
    const elem = document.querySelector('.promotions-nav') as HTMLInputElement;

    offsetLeft = item.offsetLeft - elem.offsetLeft;
  }

  return offsetLeft;
};

// 更新滚动条位置
const updateScroll = (item: HTMLLIElement | null): void => {
  const elem = document.querySelector('.promotions-nav ul') as HTMLInputElement;

  if (elem === null) {
    return;
  }

  const offsetLeft = getOffsetLeft(item);

  try {
    elem.scrollTo({
      left: offsetLeft,
    });
  } catch (e) {
    elem.scrollLeft = offsetLeft;
  }
};

// 计时器
let timer = 0;

// 导航元素
const HomeNavItem = (props: IHomeNavItemProps): JSX.Element => {
  const {type, children} = props;
  const ref: any = useRef(null);
  const {state, dispatch} = useHome();

  const {promotionsType} = state;

  const onClick = (): void => {
    if (typeof window !== 'undefined') {
      window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        updateScroll(ref.current);
      }, 10);
    }

    dispatch({type: PromotionsReducerEventType.SWITCH, payload: {promotionsType: type}});
  };

  return (
    <li ref={ref} className={type === promotionsType ? 'active' : ''} onClick={onClick}>
      {children}
    </li>
  );
};

export default HomeNavItem;
