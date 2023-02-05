'use client';

import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useThrottle} from '@libs/hooks';
import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import {BingoState} from '@game/stores/bingo';

import BingoCongratulations from './BingoCongratulations';
import './BingoAstrolabeAward.scss';

interface IBingoData {
  prizeGridsState: [number, number][];
  isComplete: boolean;
}

// 大奖
const BingoAstrolabeAward = (): JSX.Element => {
  const {prizeGridsState, isComplete} = useSelector<BingoState>(state => {
    const {prizeGridsState, isComplete} = state.bingo;

    return {prizeGridsState, isComplete};
  }) as IBingoData;

  // 是否可领取
  const [isReceive, setReceiveState] = useState<boolean>(false);
  // 是否显示奖励弹窗
  const [visible, setVisible] = useState<boolean>(false);

  // 领取奖励
  const handleReceive = useThrottle(async (): Promise<void> => {
    if (!isReceive) {
      return;
    }

    setVisible(true);
  });

  useEffect(() => {
    if (!isComplete) {
      setVisible(false);
    }
  }, [isComplete]);

  // 更新领取状态
  useEffect(() => {
    let res = true;

    if (!isComplete) {
      res = false;
    }

    if (res) {
      const states = new Map(prizeGridsState);

      for (const state of states.values()) {
        if (state !== 2) {
          res = false;

          break;
        }
      }
    }

    setReceiveState(res);
  }, [prizeGridsState, isComplete]);

  return (
    <>
      <div className={isReceive ? 'astrolabe-award active' : 'astrolabe-award'} onClick={handleReceive}>
        <WidgetSvga className="astrolabe-award_halo" url={Assets.currencyHaloAstrolabe} />
        <i className="astrolabe-award_icon"></i>
        <i className="astrolabe-award_stars"></i>
        <i className="astrolabe-award_active"></i>
      </div>
      <BingoCongratulations currency="USDT" amount={100} isOpen={visible} />
    </>
  );
};

export default BingoAstrolabeAward;
