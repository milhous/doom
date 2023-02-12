import {useState, useEffect} from 'react';
import type {Connector} from '@web3-react/types';
import type {Web3ReactHooks} from '@web3-react/core';
import type {AddEthereumChainParameter} from '@web3-react/types';
import {formatEther, formatUnits, toBigInt} from 'ethers';
import {WalletConnect} from '@web3-react/walletconnect';
import {
  Web3BasicChainInfo,
  Web3ExtendedChainInfo,
  Web3BlockExplorerInfo,
  Web3Account,
  Web3ChainId,
  Web3IsActive,
} from '@web3/types';
import {CHAINS} from '@web3/utils/chains';

// 是否为扩展信息
function isExtendedChainInfo(
  chainInfo: Web3BasicChainInfo | Web3ExtendedChainInfo,
): chainInfo is Web3ExtendedChainInfo {
  return !!(chainInfo as Web3ExtendedChainInfo).nativeCurrency;
}

/**
 * 获取区块链信息
 * @param {Web3ChainId} chainId 链ID
 * @returns {Web3BasicChainInfo | Web3ExtendedChainInfo}
 */
export function getChainInfo(chainId: Web3ChainId): Web3BasicChainInfo | Web3ExtendedChainInfo {
  const chainInformation = CHAINS[chainId];

  return chainInformation;
}

/**
 * 获取 Chain 附加信息
 * @param {Web3ChainId} chainId 链ID
 * @returns {AddEthereumChainParameter | number}
 */
export function getAddChainParameters(chainId: Web3ChainId): AddEthereumChainParameter | number {
  const chainInformation = getChainInfo(chainId);
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
 * @param {Web3ChainId} chainId 链ID
 * @returns {Web3BlockExplorerInfo}
 */
export function getBlockExplorerInfo(chainId: Web3ChainId): Web3BlockExplorerInfo {
  const chainInformation = getChainInfo(chainId);
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
 * 获取币种名称
 * @param {Web3ChainId} chainId 链ID
 * @returns {string}
 */
export function getCurrencyName(chainId: Web3ChainId): string {
  const chainInformation = getChainInfo(chainId);
  let currencyName = '';

  if (!!chainInformation && isExtendedChainInfo(chainInformation)) {
    currencyName = chainInformation.nativeCurrency.symbol;
  }

  return currencyName;
}

/**
 * 断开钱包
 * @param {Connector} connector 连接器
 * @param {Web3IsActive} isActive 是否激活
 * @returns
 */
export function disconnect(connector: Connector, isActive: Web3IsActive) {
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
 * @param {Web3ChainId} chainId 链ID
 * @returns
 */
export async function swithChain(connector: Connector, chainId: Web3ChainId): Promise<boolean> {
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
 * @param {Web3Account} account 地址
 * @param {number} decimals 保留小数点位数 -1：默认18位
 * @returns {string}
 */
export async function getBalance(
  provider: ReturnType<Web3ReactHooks['useProvider']>,
  account: Web3Account,
  decimals = -1,
): Promise<string> {
  const balance = await provider.getBalance(account);
  let res = formatEther(balance.toBigInt());

  if (decimals >= 0) {
    const regex = new RegExp(`^\\d+(?:\\.\\d{0,${decimals}})?`);

    res = res.match(regex).toString();
  }

  return res;
}

/**
 * Hook - 获取余额
 * @param {BaseProvider} provider 提供者是一个连接以太坊网络的抽象，用与查询以太坊网络状态或者发送更改状态的交易。
 * @param {Web3Account} account 地址
 * @param {number} decimals 保留小数点位数
 * @returns {string}
 */
export const useBalance = (
  provider: ReturnType<Web3ReactHooks['useProvider']>,
  account: Web3Account,
  decimals = 4,
): string => {
  const [ammount, setAmmount] = useState<string>('--');

  useEffect(() => {
    if (provider && account) {
      (async () => {
        const balance = await getBalance(provider, account, decimals);

        setAmmount(balance);
      })();
    } else {
      setAmmount('--');
    }
  }, [provider, account]);

  return ammount;
};
