import type {AddEthereumChainParameter} from '@web3-react/types';

// 基础信息
interface IBasicChainInfo {
  urls: string[];
  name: string;
}

// 区块链浏览器信息
interface IBlockExplorerInfo {
  blockExplorerName: string;
  blockExplorerUrl: string;
}

// 扩展信息
interface IExtendedChainInfo extends IBasicChainInfo {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

// 货币信息
const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
};

const FTM: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ftm',
  symbol: 'FTM',
  decimals: 18,
};

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Bnb',
  symbol: 'BNB',
  decimals: 18,
};

// 链信息
export const CHAINS: {[chainId: number]: IBasicChainInfo | IExtendedChainInfo} = {
  1: {
    urls: filterUrls(['https://mainnet.infura.io/v3/']),
    name: 'Mainnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://etherscan.io'],
  },
  5: {
    urls: filterUrls([
      process.env.alchemyKey ? `https://eth-goerli.g.alchemy.com/v2/${process.env.alchemyKey}` : '',
      'https://goerli.infura.io/v3/',
    ]),
    name: 'Görli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  // BNB
  56: {
    urls: ['https://bsc-dataseed.binance.org/'],
    name: 'Smart Chain',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com'],
  },
  // Polygon
  137: {
    urls: ['https://rpc-mainnet.maticvigil.com/'],
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  // FTM
  250: {
    urls: ['https://rpc.ftm.tools'],
    name: 'Fantom Opera',
    nativeCurrency: FTM,
    blockExplorerUrls: ['https://ftmscan.com'],
  },
};

// 筛选非空URLS
function filterUrls(urls: string[]): string[] {
  const res = urls.filter(url => url !== '');

  return res;
}

// 是否为扩展信息
function isExtendedChainInfo(chainInfo: IBasicChainInfo | IExtendedChainInfo): chainInfo is IExtendedChainInfo {
  return !!(chainInfo as IExtendedChainInfo).nativeCurrency;
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
 * @returns {IBlockExplorerInfo}
 */
export function getBlockExplorerInfo(chainId: number): IBlockExplorerInfo {
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

// 获取 RPC URL
export const URLS: {[chainId: number]: string[]} = Object.keys(CHAINS).reduce<{[chainId: number]: string[]}>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls;

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs;
    }

    return accumulator;
  },
  {},
);
