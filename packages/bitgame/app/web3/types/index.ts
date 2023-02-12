import {Web3ReactHooks} from '@web3-react/core';
import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';
import type {AddEthereumChainParameter} from '@web3-react/types';

export type Web3Connector = MetaMask | WalletConnect | CoinbaseWallet;

export type Web3ChainId = ReturnType<Web3ReactHooks['useChainId']>;

export type Web3IsActivating = ReturnType<Web3ReactHooks['useIsActivating']>;

export type Web3IsActive = ReturnType<Web3ReactHooks['useIsActive']>;

export type Web3ENSNames = ReturnType<Web3ReactHooks['useENSNames']>;

export type Web3Provider = ReturnType<Web3ReactHooks['useProvider']>;

export type Web3Accounts = ReturnType<Web3ReactHooks['useAccounts']>;

export type Web3Account = ReturnType<Web3ReactHooks['useAccount']>;

// 基础信息
export interface Web3BasicChainInfo {
  urls: string[];
  name: string;
}

// 区块链浏览器信息
export interface Web3BlockExplorerInfo {
  blockExplorerName: string;
  blockExplorerUrl: string;
}

// 扩展信息
export interface Web3ExtendedChainInfo extends Web3BasicChainInfo {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}
