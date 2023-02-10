'use client';

import {useEffect, useState} from 'react';

import {PackageType, ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import WidgetModal from '@widget/modal';

import {coinbaseWallet, hooks as coinbaseWalletHooks} from '@web3/connectors/coinbaseWallet';
import {metaMask, hooks as metaMaskHooks} from '@web3/connectors/metaMask';
import {walletConnect, hooks as walletConnectHooks} from '@web3/connectors/walletConnect';

import Assets from '../assets';
import {useModal} from '../hooks';
import './Link.scss';

//
const BtnMetaMassk = (props: {onClose: () => void}) => {
  const {onClose} = props;
  const onClick = async (): Promise<void> => {
    !!onClose && onClose();

    await metaMask.activate(5);
  };

  return (
    <li onClick={onClick}>
      <span>MetaMask</span>
      <Assets.IconMetaMask className="icon-metaMask" />
    </li>
  );
};

const BtnCoinbase = (props: {onClose: () => void}) => {
  const {onClose} = props;
  const onClick = async (): Promise<void> => {
    console.log(onClose);

    !!onClose && onClose();

    await coinbaseWallet.activate(5);
  };

  return (
    <li onClick={onClick}>
      <span>Coinbase Wallet</span>
      <Assets.IconCoinbase className="icon-coinbase" />
    </li>
  );
};

// 弹层 - 链接钱包
const UIModalWalletLink = () => {
  const {t} = useTranslate(['modal'], PackageType.UI);
  const {visible, setVisible} = useModal(ModalType.LINK_WALLET);

  // 关闭
  const onClose = () => {
    setVisible(false);
  };

  return (
    <WidgetModal classname="ui-modal" isActive={visible}>
      <div className="modal-wallet_link">
        <div className="ui-modal_container">
          <dl className="ui-modal_title">
            <dt>{t('linkWallet')}</dt>
            <dd className="ui-modal_btn" onClick={onClose}>
              <Assets.IconClose />
            </dd>
          </dl>
          <ul>
            <BtnMetaMassk onClose={onClose} />
            <li>
              <span>WalletConnect</span>
              <Assets.IconWalletConnect className="icon-walletConnect" />
            </li>
            <BtnCoinbase onClose={onClose} />
          </ul>
        </div>
      </div>
    </WidgetModal>
  );
};

export default UIModalWalletLink;
