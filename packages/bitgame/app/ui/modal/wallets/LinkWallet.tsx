'use client';

import {useEffect, useState} from 'react';

import {PackageType, ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import WidgetModal from '@widget/modal';

import Assets from '../assets';
import {useModal} from '../hooks';
import './LinkWallet.scss';

// 弹层 - 链接钱包
const UIModalLinkWallet = () => {
  const {t} = useTranslate(['modal'], PackageType.UI);
  const {visible, setVisible} = useModal(ModalType.LINK_WALLET);

  // 关闭
  const onClose = () => {
    setVisible(false);
  };

  return (
    <WidgetModal classname="bitgame-modal" isActive={visible}>
      <div className="bitgame-modal_linkwallet">
        <div className="bitgame-modal_container">
          <dl>
            <dt>{t('linkWallet')}</dt>
            <dd onClick={onClose}>
              <Assets.IconClose />
            </dd>
          </dl>
          <ul>
            <li>
              <span>MetaMask</span>
              <Assets.IconMetaMask />
            </li>
            <li>
              <span>WalletConnect</span>
              <Assets.IconWalletConnect />
            </li>
            <li>
              <span>Coinbase Wallet</span>
              <Assets.IconCoinbase />
            </li>
          </ul>
        </div>
      </div>
    </WidgetModal>
  );
};

export default UIModalLinkWallet;
