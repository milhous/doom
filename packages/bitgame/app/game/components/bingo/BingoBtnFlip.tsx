'use client';

import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useWeb3React} from '@web3-react/core';

import {PackageType, ModalType, ChainType} from '@libs/config';

import {useTranslate} from '@libs/i18n/client';
import {useThrottle, useInterval} from '@libs/hooks';
import {showModal} from '@ui/modal';
import {toast, error, dismissToast} from '@widget/toastify';
import WidgetTranslate from '@widget/translate';
import {useBalance, getCurrencyName, contractFundMe} from '@web3/core';

import {BingoState} from '@game/stores/bingo';
import {flip} from '@game/reducers/bingo';
import {apiBingoFlip} from '@game/api/bingo';

import './BingoBtnFlip.scss';

interface IBingoData {
  flipCurrency: string;
  flipAmount: number;
  flipBalance: number;
  isComplete: boolean;
  transitionIds: number[];
}

// 翻牌按钮
const BingoBtnFlip = (): JSX.Element => {
  const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);
  const {provider, account, isActive, chainId} = useWeb3React();
  const balance = useBalance(provider, account);
  const dispatch = useDispatch();
  const {flipCurrency, flipAmount, flipBalance, isComplete, transitionIds} = useSelector<BingoState>(state => {
    const {flipCurrency, flipAmount, flipBalance, isComplete, transitionIds} = state.bingo;

    return {flipCurrency, flipAmount, flipBalance, isComplete, transitionIds};
  }) as IBingoData;
  const time = 5;

  // 是否自动
  const [isAuto, setFilpAuto] = useState<boolean>(false);
  // 是否禁用翻牌
  const [isFlipDisable, setFilpDisable] = useState<boolean>(false);
  // 是否切换
  const [isSwitchDisable, setSwitchDisable] = useState<boolean>(false);
  // 自动投币
  const [canTime, setCanTime] = useState<boolean>(false);

  useInterval(
    () => {
      const data = apiBingoFlip();

      if (data.gridId) {
        dispatch(flip(data));
      } else {
        setFilpAuto(false);
      }
    },
    canTime ? time * 1000 : null,
  );

  // 事件 - 手动翻牌
  const handleManual = useThrottle(async () => {
    // 如果钱包未链接，显示链接弹层
    if (!isActive) {
      showModal(ModalType.LINK_CHAIN);

      return;
    }

    // 如果网络不匹配，显示切换弹层
    if (chainId !== ChainType.GOERLI) {
      showModal(ModalType.SWITCH_CHAIN);

      return;
    }

    if (Number(balance) < flipAmount) {
      error(t('error:error_5001'));

      return;
    }

    setFilpDisable(true);

    const toastId = toast(t('order_status'), {autoClose: false});

    try {
      await contractFundMe(provider);

      dismissToast(toastId);

      const data = apiBingoFlip();

      if (data.gridId) {
        dispatch(flip(data));
      }
    } catch (err) {
      dismissToast(toastId);

      error(t('error:error_9005'));

      setFilpDisable(false);
    }
  });

  // 事件 - 自动翻牌
  const handlerAuto = () => {
    if (Number(balance) < flipAmount) {
      error(t('error:error_5001'));

      setFilpAuto(false);

      return;
    }

    if (!isAuto) {
      const data = apiBingoFlip();

      if (data.gridId) {
        dispatch(flip(data));
      } else {
        setFilpAuto(false);
      }
    }

    setFilpAuto(!isAuto);
  };

  // 翻牌过渡动画
  useEffect(() => {
    setCanTime(isAuto);

    if (isAuto || (Array.isArray(transitionIds) && transitionIds.length > 0)) {
      setFilpDisable(true);
    } else {
      setFilpDisable(false);
    }
  }, [transitionIds, isAuto]);

  // 本轮翻盘是否完成
  useEffect(() => {
    if (isComplete) {
      setFilpAuto(!isComplete);
    }

    setSwitchDisable(isComplete);
  }, [isComplete]);

  return (
    <ul className={isAuto ? 'bingo-play stop' : 'bingo-play auto'}>
      <li>
        <button className="bingo-btn bingo-btn_flip" disabled={isComplete || isFlipDisable} onClick={handleManual}>
          <dl>
            <dt>
              <i></i>
              <span>{flipAmount}</span>&nbsp;{flipCurrency}
            </dt>
            <dd>
              <WidgetTranslate i18nT={t} i18nKey="balance" />: {getCurrencyName(chainId)} {balance}
            </dd>
          </dl>
          <div></div>
        </button>
      </li>
      <li>
        <button className="bingo-btn bingo-btn_switch" onClick={handlerAuto} disabled={isSwitchDisable}>
          {isAuto ? <WidgetTranslate i18nT={t} i18nKey="stop" /> : <WidgetTranslate i18nT={t} i18nKey="auto" />}
        </button>
      </li>
    </ul>
  );
};

export default BingoBtnFlip;
