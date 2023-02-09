'use client';

import {useState, useEffect, useCallback} from 'react';
import {useWeb3React, Web3ReactHooks} from '@web3-react/core';
// import {useState} from 'react';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import WidgetTranslate from '@widget/translate';
import {getName} from '@web3/utils';
import {CHAINS, getAddChainParameters, URLS} from '@web3/utils/chains';

import './CompButtons.scss';

// 按钮
const CompButtons = (): JSX.Element => {
  const {t} = useTranslate(['header'], PackageType.UI);
  const {connector} = useWeb3React();
  const chainIds = Object.keys(CHAINS).map(chainId => Number(chainId));
  const [desiredChainId, setDesiredChainId] = useState<number>(1);

  console.log(getName(connector));

  useEffect(() => {
    console.log(chainIds);

    console.log(getAddChainParameters(desiredChainId));
  }, []);

  const handleLogin = useCallback(async (): Promise<void> => {
    await connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId));

    console.log('succeed');
  }, [connector, desiredChainId]);

  const handleSignup = (): void => {
    // showModal(ModalType.SIGN_UP);
  };

  return (
    <div className="ui-header_btns">
      <button className="header-btns_login" onClick={handleLogin}>
        <WidgetTranslate i18nT={t} i18nKey="btn_login" />
      </button>
      <button className="header-btns_signup" onClick={handleSignup}>
        <WidgetTranslate i18nT={t} i18nKey="btn_signup" />
      </button>
    </div>
  );
};

export default CompButtons;
