'use client';

import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import WidgetModal from '@widget/modal';
import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import {reset} from '@game/reducers/bingo';

import './BingoCongratulations.scss';

// 弹层 - 胜利
const BingoCongratulations = (props: {currency: string; amount: string; isOpen: boolean}): JSX.Element => {
  const {currency, amount, isOpen} = props;
  const {t} = useTranslate(['bingo'], PackageType.GAME);
  const dispatch = useDispatch();

  // 是否显示
  const [visible, setVisible] = useState<boolean>(isOpen);

  // 关闭
  const handleClose = () => {
    setVisible(false);

    dispatch(reset());
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  return (
    <WidgetModal classname="bingo-pop" isActive={visible}>
      <WidgetSvga url={Assets.congratulations} time={1} />
      <div className="bingo-pop_congratulations">
        <div className="bingo-pop_container">
          <h3>{t('congratulations')}</h3>
          <p>
            {t('award')
              .replace('{name}', currency)
              .replace('{amount}', '' + amount)}
          </p>
          <button className="btn-confirm" onClick={handleClose}>
            {t('confirm')}
          </button>
        </div>
      </div>
    </WidgetModal>
  );
};

export default BingoCongratulations;
