'use client';

import {Web3ReactProvider} from '@web3-react/core';

import connectors from '@web3/connectors';

const Web3Provider = ({children}: {children: React.ReactNode}): JSX.Element => {
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>;
};

export default Web3Provider;
