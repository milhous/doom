import type {Connector} from '@web3-react/types';
import type {AddEthereumChainParameter} from '@web3-react/types';
import {WalletConnect} from '@web3-react/walletconnect';
import {Web3BasicChainInfo, Web3ExtendedChainInfo, Web3BlockExplorerInfo} from '@web3/types';
import {CHAINS} from '@web3/utils/chains';

// 是否为扩展信息
function isExtendedChainInfo(
  chainInfo: Web3BasicChainInfo | Web3ExtendedChainInfo,
): chainInfo is Web3ExtendedChainInfo {
  return !!(chainInfo as Web3ExtendedChainInfo).nativeCurrency;
}

/**
 * 获取 Chain 附加信息
 * @param {number} chainId 链ID
 * @returns {AddEthereumChainParameter | number}
 */
export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (!!chainInformation && isExtendedChainInfo(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

/**
 * 获取区块链浏览器信息
 * @param {number} chainId 链ID
 * @returns {Web3BlockExplorerInfo}
 */
export function getBlockExplorerInfo(chainId: number): Web3BlockExplorerInfo {
  const chainInformation = CHAINS[chainId];
  let blockExplorerName = '';
  let blockExplorerUrl = '';

  if (!!chainInformation && 'blockExplorerUrls' in chainInformation) {
    blockExplorerUrl = chainInformation.blockExplorerUrls[0];
    blockExplorerName = blockExplorerUrl.replace('https://', '').split('.')[0];
  }

  return {
    blockExplorerName,
    blockExplorerUrl,
  };
}

/**
 * 获取区块链信息
 * @param {number} chainId 链ID
 * @returns {Web3BasicChainInfo | Web3ExtendedChainInfo}
 */
export function getChainInfo(chainId: number): Web3BasicChainInfo | Web3ExtendedChainInfo {
  const chainInformation = CHAINS[chainId];

  return chainInformation;
}

/**
 * 断开钱包
 * @param {Connector} connector 连接器
 * @param {boolean} isActive 是否激活
 * @returns
 */
export function disconnect(connector: Connector, isActive: boolean) {
  if (!isActive) {
    return;
  }

  if (connector?.deactivate) {
    connector.deactivate();
  } else {
    connector.resetState();
  }
}

/**
 * 切换链
 * @param {Connector} connector 连接器
 * @param {number} chainId 链ID
 * @returns
 */
export async function swithChain(connector: Connector, chainId: number): Promise<boolean> {
  //   if (connector instanceof WalletConnect) {
  //     connector.activate(chainId);
  //   } else {
  //     connector.activate(getAddChainParameters(chainId));
  //   }

  try {
    await connector.activate(getAddChainParameters(chainId));

    return true;
  } catch (err) {
    return false;
  }
}
