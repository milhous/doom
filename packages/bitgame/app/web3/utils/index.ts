import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';
import type {Connector} from '@web3-react/types';

import {Web3Account} from '@web3/types';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  // if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet';
  return 'Unknown';
}

/**
 * 获取略写地址
 * @param {string} address 钱包地址
 * @returns
 */
export function getThumbAccount(account: Web3Account): string {
  let res = '';

  if (typeof account === 'string') {
    res = `${account.slice(0, 2)}...${account.slice(-4)}`;
  }

  return res;
}
