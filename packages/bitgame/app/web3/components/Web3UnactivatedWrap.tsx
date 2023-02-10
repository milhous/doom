'use client';

import {useWeb3React} from '@web3-react/core';

const Web3ActivatedStateWrap = ({children}: {children: React.ReactNode}) => {
  const {isActive} = useWeb3React();

  return !isActive && <>{children}</>;
};

export default Web3ActivatedStateWrap;
