import type {AddEthereumChainParameter} from '@web3-react/types';

// 基础信息
interface BasicChainInfo {
  urls: string[];
  name: string;
}

// 扩展信息
interface ExtendedChainInfo extends BasicChainInfo {
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
export const CHAINS: {[chainId: number]: BasicChainInfo | ExtendedChainInfo} = {
  1: {
    urls: filterUrls([
      process.env.alchemyKey ? `https://eth-mainnet.g.alchemyapi.io/v2/${process.env.alchemyKey}` : '',
      'https://mainnet.infura.io/v3/',
    ]),
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
  },
  // BNB
  56: {
    urls: ['https://bsc-dataseed.binance.org/'].filter(url => url !== ''),
    name: 'Smart Chain',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com'],
  },
  // Polygon
  137: {
    urls: [
      process.env.alchemyKey ? `https://polygon-mainnet.infura.io/v3/${process.env.alchemyKey}` : '',
      'https://rpc-mainnet.maticvigil.com/',
    ].filter(url => url !== ''),
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  // FTM
  250: {
    urls: ['https://rpc.ftm.tools'].filter(url => url !== ''),
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
function isExtendedChainInfo(chainInfo: BasicChainInfo | ExtendedChainInfo): chainInfo is ExtendedChainInfo {
  return !!(chainInfo as ExtendedChainInfo).nativeCurrency;
}

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
