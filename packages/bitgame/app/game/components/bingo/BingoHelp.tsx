'use client';

import {useState, useEffect} from 'react';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import WidgetModal from '@widget/modal';

import './BingoHelp.scss';

// 帮助
const BingoHelp = (props: {isOpen: boolean; onClose: () => void}): JSX.Element => {
  const {isOpen, onClose} = props;
  const {t} = useTranslate(['bingo'], PackageType.GAME);

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
      <div className="bingo-pop_help">
        <div className="bingo-pop_container">
          <ul>
            <li>· {t('help_desc1')}</li>
            <li>· {t('help_desc2')}</li>
            <li>· {t('help_desc3')}</li>
          </ul>
          <ul>
            <li>· {t('help_desc4')}</li>
            <li>· {t('help_desc5')}</li>
            <li>· {t('help_desc6')}</li>
          </ul>
          <button className="btn-confirm" onClick={handleClose}>
            {t('confirm')}
          </button>
        </div>
      </div>
    </WidgetModal>
  );
};

export default BingoHelp;
