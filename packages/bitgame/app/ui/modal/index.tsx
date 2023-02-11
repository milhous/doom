import dynamic from 'next/dynamic';

import {CustomEventType} from '@libs/config';

import {IModalData} from './type';

import './index.scss';

// 钱包
const WalletLinkChain = dynamic(() => import('./wallet/LinkChain'), {ssr: false});
const WalletSwitchChain = dynamic(() => import('./wallet/SwitchChain'), {ssr: false});

/**
 * 显示弹层
 * @param {number} type 类型
 * @param {string} data 数据
 */
export const showModal = (type: number, data?: any): void => {
  const detail: IModalData = {
    type,
    data,
  };

  window.dispatchEvent(new CustomEvent(CustomEventType.MODAL_SHOW, {detail}));
};

/**
 * 关闭弹层
 * @param {number} type 类型
 * @param {boolean} isAll 是否关闭所有
 */
export const closeModal = (type: number, isAll = false): void => {
  const detail: IModalData = {
    type,
    isAll,
  };

  window.dispatchEvent(new CustomEvent(CustomEventType.MODAL_CLOSE, {detail}));
};

const UIModal = () => {
  return (
    <>
      <WalletSwitchChain />
      <WalletLinkChain />
    </>
  );
};

export default UIModal;
