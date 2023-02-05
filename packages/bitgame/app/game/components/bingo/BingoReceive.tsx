'use client';

import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Image from 'next/image';

import {useThrottle} from '@libs/hooks';
import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import {astrolabeConfig} from '@game/config/bingo';
import {BingoState} from '@game/stores/bingo';

import BingoReceiveAward from './BingoReceiveAward';
import './BingoReceive.scss';

interface IBingoData {
  prizeGridsState: [number, number][];
  isComplete: boolean;
}

// 星座 - 高亮
const Constellation = (props: {pid: number; state: number}): JSX.Element => {
  const {pid, state} = props;
  // 星座名称
  const astrolabeName = astrolabeConfig['' + pid];

  return (
    <li className={state === 2 ? 'active' : ''}>
      <i style={{backgroundImage: `url(${Assets[astrolabeName + 'Receive'].src})`}} />
    </li>
  );
};

// 领取按钮
const BingoReceive = (): JSX.Element => {
  const {prizeGridsState, isComplete} = useSelector<BingoState>(state => {
    const {prizeGridsState, isComplete} = state.bingo;

    return {prizeGridsState, isComplete};
  }) as IBingoData;

  // 大奖名称
  const name = 'USDT';
  // 大奖金额
  const amount = 100;

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

  // 隐藏奖励
  const handleClose = () => {
    setVisible(false);
  };

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
      <div className={isReceive ? 'bingo-receive active' : 'bingo-receive'} onClick={handleReceive}>
        <div>
          <ul>
            {prizeGridsState.map(([pid, state]) => {
              return <Constellation key={pid} pid={pid} state={state} />;
            })}
          </ul>
          <i className="bingo-receive_currency"></i>
          <i className="bingo-receive_award"></i>
        </div>
        <dl>
          <dt>{name}</dt>
          <dd>
            <Image src={Assets.iconAward} alt={name} width={119} height={119} />
            <span>x{amount}</span>
          </dd>
        </dl>
      </div>
      <BingoReceiveAward currency="USDT" amount={100} isOpen={visible} onClose={handleClose} />
    </>
  );
};

export default BingoReceive;
