'use client';

import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useWeb3React} from '@web3-react/core';
import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useThrottle} from '@libs/hooks';
import {useTranslate} from '@libs/i18n/client';
import {toast, error, dismissToast} from '@widget/toastify';
import {getCurrencyName, contractGetBalance, contractWithdraw} from '@web3/core';

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
  const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);
  const {provider, chainId} = useWeb3React();
  const {prizeGridsState, isComplete} = useSelector<BingoState>(state => {
    const {prizeGridsState, isComplete} = state.bingo;

    return {prizeGridsState, isComplete};
  }) as IBingoData;

  // 币种名称
  const [currency, setCurrency] = useState<string>('');
  // 币种名称
  const [amount, setAmount] = useState<string>('');
  // 是否可领取
  const [isReceive, setReceiveState] = useState<boolean>(false);
  // 是否显示奖励弹窗
  const [visible, setVisible] = useState<boolean>(false);

  // 领取奖励
  const handleReceive = useThrottle(async (): Promise<void> => {
    if (!isReceive) {
      return;
    }

    const _currency = getCurrencyName(chainId);

    setCurrency(_currency);

    const _amount = await contractGetBalance(provider);

    setAmount(_amount);

    const toastId = toast(t('order_status'), {autoClose: false});

    try {
      await contractWithdraw(provider);

      dismissToast(toastId);

      setVisible(true);
    } catch (err) {
      dismissToast(toastId);

      error(t('error:error_9005'));
    }
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
          <dt>{currency}</dt>
          <dd>
            <Image src={Assets.iconAward} alt={currency} width={119} height={119} />
            <span>x{amount}</span>
          </dd>
        </dl>
      </div>
      <BingoReceiveAward currency={currency} amount={amount} isOpen={visible} onClose={handleClose} />
    </>
  );
};

export default BingoReceive;
