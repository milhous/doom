'use client';

import {useWeb3React} from '@web3-react/core';

import {ModalType} from '@libs/config';
import {useThrottle} from '@libs/hooks';
import {showModal} from '@ui/modal';

// 登录按钮
const HomeLoginBtn = ({children}: {children: React.ReactNode}): JSX.Element => {
  const {isActive} = useWeb3React();

  // 事件 - 登录
  const handlerLogin = useThrottle((): void => {
    if (isActive) {
      return;
    }

    showModal(ModalType.LINK_CHAIN);
  }, 1000);

  return (
    <button className="btn-invite" onClick={handlerLogin}>
      {children}
    </button>
  );
};

export default HomeLoginBtn;
