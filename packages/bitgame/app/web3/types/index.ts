import {Web3ReactHooks} from '@web3-react/core';
import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';

export type Connector = MetaMask | WalletConnect | CoinbaseWallet;

export type ChainId = ReturnType<Web3ReactHooks['useChainId']>;

export type IsActivating = ReturnType<Web3ReactHooks['useIsActivating']>;

export type IsActive = ReturnType<Web3ReactHooks['useIsActive']>;

export type ENSNames = ReturnType<Web3ReactHooks['useENSNames']>;

export type Provider = ReturnType<Web3ReactHooks['useProvider']>;

export type Accounts = ReturnType<Web3ReactHooks['useAccounts']>;
