'use client';

import {useState, useEffect} from 'react';
import {Trans} from 'react-i18next';
import {useWeb3React} from '@web3-react/core';

import {PackageType, ModalType, ChainType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import {useThrottle} from '@libs/hooks';
import WidgetModal from '@widget/modal';
import {disconnect, swithChain, getChainInfo} from '@web3/core';

import Assets from '../assets';
import {useModal} from '../hooks';
import './SwitchChain.scss';

// 按钮 - 切换
const BtnSwtichChain = (props: {onClose: () => void}): JSX.Element => {
  const {onClose} = props;
  const {t} = useTranslate(['modal'], PackageType.UI);
  const {connector} = useWeb3React();
  const switchChainInfo = getChainInfo(ChainType.GOERLI);

  const [disabled, setDisabled] = useState<boolean>(false);

  // 切换链
  const handleSwitch = useThrottle(async (): Promise<void> => {
    setDisabled(true);

    const res = await swithChain(connector, ChainType.GOERLI);

    if (res) {
      onClose();
    } else {
      setDisabled(false);
    }
  }, 1000);

  return (
    <button className="ui-modal_btns modal-btns_primary" disabled={disabled} onClick={handleSwitch}>
      <Trans t={t} i18nKey="switch_to" values={{chainName: `${switchChainInfo.name}`}} />
      {disabled && <span className="modal-btns_loading"></span>}
    </button>
  );
};

// 按钮 - 断开
const BtnDisconnectChain = (props: {onClose: () => void}): JSX.Element => {
  const {onClose} = props;
  const {t} = useTranslate(['modal'], PackageType.UI);
  const {connector, isActive} = useWeb3React();

  // 断开钱包
  const handleDisconnect = useThrottle((): void => {
    disconnect(connector, isActive);

    onClose();
  }, 1000);

  return (
    <button className="ui-modal_btns modal-btns_default" onClick={handleDisconnect}>
      {t('disconnect_wallet')}
    </button>
  );
};

// 网络信息
const NetworkInfo = (): JSX.Element => {
  const {t} = useTranslate(['modal'], PackageType.UI);
  const {chainId} = useWeb3React();
  const switchChainInfo = getChainInfo(ChainType.GOERLI);

  const [locatedName, setLocatedName] = useState<string>('');

  useEffect(() => {
    if (!!chainId) {
      const locatedChainInfo = getChainInfo(chainId);

      setLocatedName(locatedChainInfo.name);
    }
  }, [chainId]);

  return (
    <ul>
      <li>
        <Trans t={t} i18nKey="located_network" values={{chainName: `${switchChainInfo.name}`}} />
      </li>
      <li>
        <Trans t={t} i18nKey="switch_network" values={{chainName: `${locatedName}`}} />
      </li>
    </ul>
  );
};

// 弹层 - 切换链
const UIModalWalletSwitchChain = (): JSX.Element => {
  const {t} = useTranslate(['modal'], PackageType.UI);
  const {visible, setVisible} = useModal(ModalType.SWITCH_CHAIN);

  // 关闭
  const onClose = () => {
    setVisible(false);
  };

  return (
    <WidgetModal classname="ui-modal" isActive={visible}>
      <div className="modal-wallet_switch">
        <div className="ui-modal_container">
          <dl className="ui-modal_title">
            <dt>{t('wrong_network')}</dt>
            <dd className="ui-modal_btn" onClick={onClose}>
              <Assets.IconClose />
            </dd>
          </dl>
          <div className="ui-modal_content">
            <NetworkInfo />
            <BtnSwtichChain onClose={onClose} />
            <BtnDisconnectChain onClose={onClose} />
          </div>
        </div>
      </div>
    </WidgetModal>
  );
};

export default UIModalWalletSwitchChain;
