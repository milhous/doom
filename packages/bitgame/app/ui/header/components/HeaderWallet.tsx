'use client';

import {useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';

import {PackageType, ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import {copy} from '@libs/utils';
import {showModal} from '@ui/modal';
import WidgetTranslate from '@widget/translate';
import {toast} from '@widget/toastify';
import {disconnect, getBlockExplorerInfo} from '@web3/core';
import {getThumbAccount} from '@web3/utils';

import Assets from '../assets';
import './HeaderWallet.scss';

// 钱包连接
const WalletConnect = (): JSX.Element => {
  const {t} = useTranslate(['header'], PackageType.UI);
  const {isActive} = useWeb3React();

  const handleConnect = (): void => {
    showModal(ModalType.LINK_CHAIN);
  };

  return (
    <button
      className={isActive ? 'wallet-connect header-btns_primary' : 'wallet-connect header-btns_primary active'}
      onClick={handleConnect}
    >
      <WidgetTranslate i18nT={t} i18nKey="connect_wallet" />
    </button>
  );
};

// 钱包地址缩写
const WalletThumb = (): JSX.Element => {
  const {account} = useWeb3React();

  return (
    <div className="wallet-thumb">
      <Assets.IconWallet className="wallet-icon_wallet" />
      <span>{getThumbAccount(account)}</span>
      <Assets.IconArrow className="wallet-icon_arrow" />
    </div>
  );
};

// 钱包地址
const WalletAddress = (): JSX.Element => {
  const {t} = useTranslate(['header', 'common'], PackageType.UI);
  const {account} = useWeb3React();

  // 复制
  const handleCopy = (): void => {
    const tips = t('common:tips_copy_success');

    toast(tips);

    copy(account);
  };

  return (
    <dl className="wallet-address">
      <dt>{account}</dt>
      <dd>
        <Assets.IconCopy className="wallet-icon_copy" onClick={handleCopy} />
      </dd>
    </dl>
  );
};

// 区块链搜索地址
const WalletScan = (): JSX.Element => {
  const {t} = useTranslate(['header'], PackageType.UI);
  const {connector, chainId, account, isActive} = useWeb3React();
  const {blockExplorerName, blockExplorerUrl} = getBlockExplorerInfo(chainId);

  // 断开钱包
  const handleDisconnect = (): void => {
    disconnect(connector, isActive);
  };

  return (
    <ul className="wallet-scan">
      <li>
        <a href={blockExplorerUrl + '/address/' + account} title="etherscan" target="_blank" rel="noreferrer">
          {blockExplorerName}
          <Assets.IconScan className="wallet-icon_scan" />
        </a>
      </li>
      <li>
        <span onClick={handleDisconnect}>
          <WidgetTranslate i18nT={t} i18nKey="disconnect_wallet" />
        </span>
      </li>
    </ul>
  );
};

// 钱包信息
const WalletInfo = (): JSX.Element => {
  const {t} = useTranslate(['header'], PackageType.UI);
  const {isActive} = useWeb3React();

  return (
    <div className={isActive ? 'wallet-info active' : 'wallet-info'}>
      <WalletThumb />
      <div className="wallet-dropdown">
        <div className="wallet-dropdown_content">
          <h3>
            <WidgetTranslate i18nT={t} i18nKey="your_address" />
          </h3>
          <WalletAddress />
          <WalletScan />
        </div>
      </div>
    </div>
  );
};

// 按钮
const HeaderWallet = (): JSX.Element => {
  const {connector} = useWeb3React();

  // 自动连接钱包
  useEffect(() => {
    connector?.connectEagerly();
  }, []);

  return (
    <div className="ui-header_wallet">
      <WalletInfo />
      <WalletConnect />
    </div>
  );
};

export default HeaderWallet;
