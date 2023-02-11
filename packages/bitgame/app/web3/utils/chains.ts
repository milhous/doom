import type {AddEthereumChainParameter} from '@web3-react/types';
import {Web3BasicChainInfo, Web3ExtendedChainInfo} from '@web3/types';

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
export const CHAINS: {[chainId: number]: Web3BasicChainInfo | Web3ExtendedChainInfo} = {
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
    name: 'BNB Smart Chain',
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
