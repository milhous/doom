'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';

import WidgetModal from '@widget/modal';
import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import BingoConstellations from './BingoConstellations';
import BingoAstrolabeAward from './BingoAstrolabeAward';

import './BingoReceiveAward.scss';

// 星盘
const Astrolabe = (props: {currency: string; amount: number}): JSX.Element => {
  const {currency, amount} = props;

  return (
    <div className="bingo-astrolabe">
      <WidgetSvga className="astrolabe-background" url={Assets.backgroundAstrolabe} />
      <div className="astrolabe-info">
        <WidgetSvga url={Assets.baseAstrolabe} />
        <dl>
          <dt>{currency}</dt>
          <dd>
            <Image src={Assets.iconAward} alt={currency} width={119} height={119} />
            <span>x{amount}</span>
          </dd>
        </dl>
      </div>
      <div className="astrolabe-sign">
        <div className="astrolabe-sign_active">
          <BingoConstellations />
        </div>
        <WidgetSvga className="astrolabe-frame" url={Assets.frameAstrolabe} />
        <BingoAstrolabeAward />
      </div>
    </div>
  );
};

const BingoReceiveAward = (props: {currency: string; amount: number; isOpen: boolean; onClose: () => void}) => {
  const {currency, amount, isOpen, onClose} = props;

  // 是否显示
  const [visible, setVisible] = useState<boolean>(isOpen);

  // 关闭
  const handleClose = () => {
    setVisible(false);

    onClose && onClose();
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  return (
    <WidgetModal classname="bingo-pop" isActive={visible}>
      <div className="bingo-pop_award">
        <div className="bingo-pop_container">
          <Astrolabe currency={currency} amount={amount} />
          <button className="btn-close" onClick={handleClose}>
            X
          </button>
        </div>
      </div>
    </WidgetModal>
  );
};

export default BingoReceiveAward;
