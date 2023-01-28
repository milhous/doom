/**
 * 声明
 * @param {number} id 活动ID
 * @param {number} type 类型 0:限时活动, 1:电竞体育, 2:娱乐游戏, 3:新人福利, 4:日常福利
 * @param {number} tag 显示类型：1:所有, 2:免费, 3:付费
 * @param {number} startTime 活动开始时间(时间戳)
 * @param {number} endTime 活动结束时间(时间戳)
 * @param {string} link 活动地址
 * @param {string} title 活动标题
 * @param {string} desc 活动描述
 * @param {string} content 活动内容
 * @param {string} img 活动图片
 */
export interface IActivityData {
  id: string;
  type: string;
  tag: number;
  startTime: number;
  endTime: number;
  link: string;
  title: string;
  desc: string;
  content: string;
  img: string;
}

// 邀请信息
const activityInfo: IActivityData[] = [
  {
    id: '5845477141003990750',
    type: '0',
    tag: 1,
    startTime: 1000,
    endTime: 167490270659900,
    link: '#',
    title: '关于币安合约强制平仓的三大错误认识',
    desc: '用户知晓可能对仓位执行强制平仓的各种情形，即可制定更好的风险管理策略。',
    content:
      '用户知晓可能对仓位执行强制平仓的各种情形，即可制定更好的风险管理策略。在币安合约开展交易，总以标记价格而不是最后价格执行强制平仓。在全仓模式和逐仓模式下，强平价格的表现有所不同。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20221223/c7048e1b-a3ee-4cca-baed-d214d0b5ee05.jpg',
  },
  {
    id: '5704082076024731087',
    type: '0',
    tag: 2,
    startTime: 0,
    endTime: 167490270659900,
    link: '#',
    title: '期货合约的最新价格和标记价格有何不同？',
    desc: '用户在币安合约交易时会遇到两种不同的价格：最新价格和标记价格。',
    content:
      '用户在币安合约交易时会遇到两种不同的价格：最新价格和标记价格。最新价格指合约的最新成交价格，而标记价格指合约的估计公允价值。为避免市场波动时不必要的强制平仓，同时防止价格操纵，币安合约强制平仓时以标记价格作为参照。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20221215/c51a9b81-9c76-442f-bacb-33da10b38641.png',
  },
  {
    id: '5358007752881344804',
    type: '0',
    tag: 3,
    startTime: 0,
    endTime: 1,
    link: '#',
    title: '如何负责任地管理风险和交易加密货币合约',
    desc: '负责任的投资方式有助于投资者免受不良后果和意外市场事件的影响，因此是成功交易的基础。',
    content:
      '虽然加密货币合约交易可能令人兴奋，但由于市场行情不确定，也可能会带来财务压力。此外，交易者经常会遇到可能引发整体市场动荡的恶意行为者和意外状况。此种情况可能会导致冲动交易，从而增加交易者的风险敞口。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20221206/cc891633-d344-4422-902a-2ebb7699d8c7.webp',
  },
  {
    id: '5599263047622772732',
    type: '1',
    tag: 3,
    startTime: 0,
    endTime: 1,
    link: '#',
    title: '如何在币安合约中与资深交易者互动',
    desc: '通过币安合约，交易者可自由分享和讨论投资策略、技术分析和价格预测。',
    content:
      '立志在该行业获得成就的交易者可能熟悉这句话—“制定交易计划并严格按计划交易”。尽管我们都应该实施稳健的风险管理策略，避免受到情绪影响，但了解市场趋势推动因素也是必须的。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20220802/2d439f0d-8a1a-411b-8075-b1591664abe3.png',
  },
  {
    id: '5192587925545831884',
    type: '2',
    tag: 2,
    startTime: 0,
    endTime: 167490270659900,
    link: '#',
    title: '衡量币安合约市场趋势的两大技术指标',
    desc: '通常，交易者依靠技术指标来了解何时进入或退出交易。这些工具将历史价格行为、交易量甚至持仓量数据转为简单易读的信号，旨在预测市场方向。',
    content:
      '借助币安合约提供的广泛指标，交易者可解读加密货币市场的数据，以此尝试预测关键的价格走势。我们旨在帮助用户将风险降至最低，同时帮助预测趋势反转，从而提供潜在交易机会。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20220818/cec71379-6fef-4f4d-af4d-46758da867d3.png',
  },
  {
    id: '4199062775325595641',
    type: '2',
    tag: 1,
    startTime: 0,
    endTime: 1,
    link: '#',
    title: '币安合约首次交易指南',
    desc: '用户知晓可能对仓位执行强制平仓的各种情形，即可制定更好的风险管理策略。',
    content:
      '有了加密货币衍生品，交易者无须拥有数字资产即可接触数字资产。市场参与者可以对冲波动性，推测特定加密货币的未来价值。运用杠杆可以提升资本效率，因为投资者不必像现货市场那样锁定大量资本。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20220818/9768d812-dbc8-476d-bf91-bcbc8b1f034e.png',
  },
  {
    id: '6132268179745824055',
    type: '4',
    tag: 2,
    startTime: 0,
    endTime: 1,
    link: '#',
    title: '币安合约推出四款加密交易工具，助您华丽变身专业人士',
    desc: '币安合约努力为交易者提供合适的工具，助他们获得成功。我们倾力打造机构级的产品与服务，让用户在任何市场条件下都能轻松进行加密货币交易。',
    content:
      '加密货币市场令人眼花缭乱，保持定力，遵循既定的交易计划并非易事。但要成为一个成功的交易者，就必须清楚地认识到与这项职业相关的种种风险。使用最先进的金融工具也能帮助您保持领先优势。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20220726/bb3f2c53-3a98-41ab-b378-0bbc6df4ac53.webp',
  },
  {
    id: '5670445909238579513',
    type: '4',
    tag: 1,
    startTime: 0,
    endTime: 1,
    link: '#',
    title: '币安合约季度报告：2022 年Q2季度',
    desc: '币安期货于本年度第二季导入了一系列交易系统更新，以改进效能与稳定性。',
    content:
      '币安合约在2022 年Q2 做了重大改进，即使在最严峻的市场态势下，也能让交易者使用合适工具，协助用户获利。我们将系统升级为机构级的交易平台，应用户需求增长新增交易对，并纳入全新功能，如时间加权平均价格(TWAP) 交易演算法，改进用户体验。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20220722/3536c034-c83e-4824-ac2a-f9f1357f5e52.png',
  },

  {
    id: '421499824684903692',
    type: '4',
    tag: 3,
    startTime: 0,
    endTime: 167490270659900,
    link: '#',
    title: '加密货币季度报告：2022年第一季度',
    desc: '2022年第一季度，机构对加密货币的需求有所提高。众多跨国公司积极探索如何采用区块链和加密货币。',
    content:
      '杰富瑞(Jefferies)、加通贝祥(Canaccord Genuity)和瑞士信贷(Credit Suisse)等华尔街银行决定组建研究团队，探索区块链领域新技术的研发。与此同时，随着用户和商户的需求不断升级，谷歌、Uber和PayPal等全美科技巨头据称正在考虑接受加密货币。',
    img: 'https://public.bnbstatic.com/image/cms/blog/20220505/76ef8325-8493-4092-ad35-1557ce0aa496.png',
  },
];

// 活动信息
export const getActivityInfo = async (): Promise<IActivityData[]> => {
  return activityInfo;
};
