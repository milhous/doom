'use client';

import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import {error} from '@widget/toastify';
import WidgetTranslate from '@widget/translate';

import {BingoState} from '@game/stores/bingo';
import {flip} from '@game/reducers/bingo';

import './BingoBtnFlip.scss';

interface IBingoState {
  flipCurrency: string;
  flipAmount: number;
  flipBalance: number;
  isComplete: boolean;
}

// 翻牌按钮
const BingoBtnFlip = (): JSX.Element => {
  const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);
  const {flipCurrency, flipAmount, flipBalance, isComplete} = useSelector<BingoState>(state => {
    const {flipCurrency, flipAmount, flipBalance, isComplete} = state.bingo;

    return {flipCurrency, flipAmount, flipBalance, isComplete};
  }) as IBingoState;
  const dispatch = useDispatch();

  // 是否自动
  const [isAuto, setFilpAuto] = useState<boolean>(false);
  // 是否禁用翻牌
  const [isFlipDisable, setFilpDisable] = useState<boolean>(false);
  // 是否切换
  const [isSwitchDisable, setSwitchDisable] = useState<boolean>(false);
  // 自动投币
  const [canTime, setCanTime] = useState<boolean>(false);

  const handleManual = () => {
    if (flipBalance < flipAmount) {
      error(t('error:error_5001'));

      return;
    }

    // setFilpDisable(true);

    dispatch(flip());
  };
  const handlerAuto = () => {
    setFilpAuto(!isAuto);
  };

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
