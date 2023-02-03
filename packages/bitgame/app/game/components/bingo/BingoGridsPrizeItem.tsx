'use client';

import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';

import Assets from '@game/assets';
import {BingoState} from '@game/stores/bingo';

import './BingoGridsItem.scss';
import './BingoGridsPrizeItem.scss';

interface IBingoData {
  transitionIds: number[];
  prizeGridsState: [number, number][];
}

/**
 * 奖励网格
 * @param {number} index 索引值
 * @param {number} pid pid
 * @param {string} pname 名称
 */
const BingoGridsPrizeItem = (props: {index: number; pid: number; pname: string}): JSX.Element => {
  const {index, pid, pname} = props;
  const dispatch = useDispatch();
  const {prizeGridsState, transitionIds} = useSelector<BingoState>(state => {
    const {prizeGridsState, transitionIds} = state.bingo;

    return {prizeGridsState, transitionIds};
  }) as IBingoData;

  // 类名
  const [classname, setClassname] = useState<string>('bingo-grids_item prize');
  // 状态 0未触发 1待领取 2已领取
  const [prizeState, setPrizeState] = useState<number>(0);

  const prizeCurrency = 'LUT';
  const prizeAmount = 10;

  // 领取状态
  useEffect(() => {
    const states = new Map(prizeGridsState);

    setPrizeState(states.get(pid));
  }, [prizeGridsState]);

  // 设置领取状态  0未触发 1待领取 2已领取
  useEffect(() => {
    if (Array.isArray(transitionIds) && transitionIds.length) {
      return;
    }

    switch (prizeState) {
      case 0:
        setClassname('bingo-grids_item prize');

        break;
      case 1:
        setClassname('bingo-grids_item prize active');

        break;
      case 2:
        setClassname('bingo-grids_item prize received');

        break;
    }
  }, [prizeState, transitionIds]);

  return (
    <li className={classname} data-index={index}>
      <div className="bingo-prize" data-pid={pid}>
        <i className={`bingo-sign bingo-sign_${pname}`}></i>
        <i className="bingo-prize_active" style={{backgroundImage: `url(${Assets[pname + 'Grids'].src})`}}></i>
        <i className="bingo-prize_halo"></i>
      </div>
      <dl className="bingo-tips">
        <dt>
          <Image src={Assets.iconLut} alt="" width={60} height={60} />
        </dt>
        <dd>
          {prizeCurrency} x{prizeAmount}
        </dd>
      </dl>
    </li>
  );
};

export default BingoGridsPrizeItem;
