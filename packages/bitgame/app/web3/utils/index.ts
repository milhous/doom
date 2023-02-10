import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';
import type {Connector} from '@web3-react/types';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  //   if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
  return 'Unknown';
}

/**
 * 获取略写地址
 * @param {string} address 钱包地址
 * @returns
 */
export function getThumbAddress(address: string): string {
  let res = '';

  if (typeof address === 'string') {
    res = `${address.slice(0, 2)}...${address.slice(-4)}`;
  }

  return res;
}
