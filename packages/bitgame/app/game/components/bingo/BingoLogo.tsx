'use client';

import {useState} from 'react';

import {useThrottle} from '@libs/hooks';

import BingoHelp from './BingoHelp';
import './BingoLogo.scss';

// Logo
const BingoLogo = (): JSX.Element => {
  // 是否显示帮助弹窗
  const [visible, setVisible] = useState<boolean>(false);

  // 显示帮助
  const handleHelp = useThrottle(() => {
    setVisible(true);
  }, 100);

  // 隐藏帮助
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="bingo-logo">
        <dl>
          <dt>
            <span>lucky</span>
            <button className="bingo-btn bingo-btn_help" onClick={handleHelp}></button>
          </dt>
          <dd>bingo</dd>
        </dl>
      </div>
      <BingoHelp isOpen={visible} onClose={handleClose} />
    </>
  );
};

export default BingoLogo;
