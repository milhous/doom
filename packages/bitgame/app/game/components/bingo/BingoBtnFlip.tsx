'use client';

import {useState, useEffect} from 'react';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';

import './BingoBtnFlip.scss';

// 翻牌按钮
const BingoBtnFlip = (): JSX.Element => {
//   const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);

  const flipCurrency = 'LUT';
  const flipAmount = 10;
  const flipBalance = 1000;
  const isComplete = true;

  // 是否自动
  const [isAuto, setFilpAuto] = useState<boolean>(false);
  // 是否禁用翻牌
  const [isFlipDisable, setFilpDisable] = useState<boolean>(false);
  // 是否切换
  const [isSwitchDisable, setSwitchDisable] = useState<boolean>(false);
  // 自动投币
  const [canTime, setCanTime] = useState<boolean>(false);

  const handleManual = () => {};
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
              {/* {t('balance')}: {flipBalance} {flipCurrency} */}
            </dd>
          </dl>
          <div></div>
        </button>
      </li>
      <li>
        <button className="bingo-btn bingo-btn_switch" onClick={handlerAuto} disabled={isSwitchDisable}>
          {/* {isAuto ? t('stop') : t('auto')} */}
        </button>
      </li>
    </ul>
  );
};

export default BingoBtnFlip;
