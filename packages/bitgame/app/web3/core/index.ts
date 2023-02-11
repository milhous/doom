import {useState, useEffect} from 'react';
import type {Connector} from '@web3-react/types';
import type {Web3ReactHooks} from '@web3-react/core';
import type {AddEthereumChainParameter} from '@web3-react/types';
import {formatEther, formatUnits, toBigInt} from 'ethers';
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

/**
 * 获取余额
 * @param {BaseProvider} provider 提供者是一个连接以太坊网络的抽象，用与查询以太坊网络状态或者发送更改状态的交易。
 * @param {string} address 地址
 * @returns {string}
 */
export async function getBalance(
  provider: ReturnType<Web3ReactHooks['useProvider']>,
  address: string,
): Promise<string> {
  const balance = await provider.getBalance(address);

  return formatEther(balance.toBigInt());
}

/**
 * Hook - 获取余额
 * @param {BaseProvider} provider 提供者是一个连接以太坊网络的抽象，用与查询以太坊网络状态或者发送更改状态的交易。
 * @param {string} address 地址
 * @param {number} decimals 保留小数点位数
 * @returns {string}
 */
export const useBalance = (
  provider: ReturnType<Web3ReactHooks['useProvider']>,
  address: string,
  decimals = 4,
): string => {
  const [ammount, setAmmount] = useState<string>('--');

  useEffect(() => {
    if (provider && address) {
      (async () => {
        const balance = await getBalance(provider, address);
        const regex = new RegExp(`^\\d+(?:\\.\\d{0,${decimals}})?`);

        setAmmount(balance.match(regex).toString());
      })();
    } else {
      setAmmount('--');
    }
  }, [provider, address]);

  return ammount;
};
