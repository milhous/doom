'use client';

import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import {useThrottle, useInterval} from '@libs/hooks';
import {error} from '@widget/toastify';
import WidgetTranslate from '@widget/translate';

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
  const handleManual = useThrottle(() => {
    if (flipBalance < flipAmount) {
      error(t('error:error_5001'));

      return;
    }

    setFilpDisable(true);

    const data = apiBingoFlip();

    if (data.gridId) {
      dispatch(flip(data));
    }
  });

  // 事件 - 自动翻牌
  const handlerAuto = () => {
    if (flipBalance < flipAmount) {
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
              <WidgetTranslate i18nT={t} i18nKey="balance" />: {flipBalance} {flipCurrency}
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
