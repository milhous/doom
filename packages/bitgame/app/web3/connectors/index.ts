import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {Web3ReactHooks} from '@web3-react/core';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';
import {coinbaseWallet, hooks as coinbaseWalletHooks} from './coinbaseWallet';
import {metaMask, hooks as metaMaskHooks} from './metaMask';
import {walletConnect, hooks as walletConnectHooks} from './walletConnect';

const connectors: [MetaMask | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  //   [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
];

export default connectors;
