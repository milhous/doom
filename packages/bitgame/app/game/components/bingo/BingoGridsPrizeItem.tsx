'use client';

import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import {useThrottle} from '@libs/hooks';
import {toast} from '@widget/toastify';

import Assets from '@game/assets';
import {BingoState} from '@game/stores/bingo';
import {receive} from '@game/reducers/bingo';

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
  const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);
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

  // 领取奖励
  const handleReceive = useThrottle(async (): Promise<void> => {
    if (prizeState !== 1) {
      return;
    }

    dispatch(receive({pid}));

    toast(
      t('award_tips')
        .replace('{name}', prizeCurrency)
        .replace('{amount}', '' + prizeAmount),
    );
  });

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
    <li className={classname} data-index={index} onClick={handleReceive}>
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
