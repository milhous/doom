'use client';

import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useWeb3React} from '@web3-react/core';

import {PackageType} from '@libs/config';
import {useThrottle} from '@libs/hooks';
import {useTranslate} from '@libs/i18n/client';
import WidgetSvga from '@widget/svga';
import {toast, error, dismissToast} from '@widget/toastify';
import {getCurrencyName, contractGetBalance, contractWithdraw} from '@web3/core';

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
  const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);
  const {provider, chainId} = useWeb3React();
  const {prizeGridsState, isComplete} = useSelector<BingoState>(state => {
    const {prizeGridsState, isComplete} = state.bingo;

    return {prizeGridsState, isComplete};
  }) as IBingoData;

  // 是否可领取
  const [isReceive, setReceiveState] = useState<boolean>(false);
  // 是否显示奖励弹窗
  const [visible, setVisible] = useState<boolean>(false);
  // 币种名称
  const [currency, setCurrency] = useState<string>('');
  // 币种名称
  const [amount, setAmount] = useState<string>('');

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
      <BingoCongratulations currency={currency} amount={amount} isOpen={visible} />
    </>
  );
};

export default BingoAstrolabeAward;
