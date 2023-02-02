import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/**
 * 奖励信息
 * @param {number} prizeId 奖励id
 * @param {number} prizeNo 奖励编号
 * @param {string} prizeName 奖励名称
 * @param {string} prizePic 奖励背景图片
 * @param {boolean} isBigPrize 是否是大奖
 * @param {string} prizeCurrency 奖励币种
 * @param {number} prizeAmount 奖励金额
 * @param {number} status 状态：0未触发 1待领取 2已领取
 */
export interface IBingoInfoPrize {
  prizeId: number;
  prizeNo: number;
  prizeName: string;
  prizePic: string;
  isBigPrize: boolean;
  prizeCurrency: string;
  prizeAmount: number;
  status: number;
}

/**
 * 声明
 * @param {string} flipCurrency 翻牌币种
 * @param {number} flipAmount 翻牌金额
 * @param {number} flipBalance 翻盘可用余额
 * @param {boolean} isComplete 本轮翻盘是否结束
 * @param {number} beginTime 开始时间
 * @param {number} endTime 结束时间
 * @param {Array<number>} transitionIds 过渡ID（用于翻牌过渡）<-> gird
 * @param {Array<number>} highlightIds 高亮ID（用于翻牌奖励高亮）<-> gird
 * @param {Array<number>} lineIds 连线ID（用于翻牌奖励连线）<-> gird
 * @param {Map<number, IBingoInfoPrize>} prizesInfo 奖励信息
 * @param {IBingoPrizesState} prizesState 奖励状态
 * @param {IBingoGridsState} gridsState 翻牌状态
 */
export interface IBingoState {
  flipCurrency: string;
  flipAmount: number;
  flipBalance: number;
  isComplete: boolean;
  beginTime: number;
  endTime: number;
  transitionIds: number[];
  highlightIds: number[];
  // lineIds: IterableIterator<[number, number[]]>;
  // prizesInfo: IterableIterator<[number, IBingoInfoPrize]>;
  // prizesState: IterableIterator<[number, number]>;
  // gridsState: IterableIterator<[number, number]>;
}

// 声明 - 奖励状态
type IBingoPrizesState = Map<number, number>;

// 声明 - 翻牌状态
type IBingoGridsState = Map<number, boolean>;

// 初始化状态
const initialState: IBingoState = {
  flipCurrency: 'LUT',
  flipAmount: 100,
  flipBalance: 10000,
  isComplete: false,
  beginTime: 0,
  endTime: 0,
  transitionIds: [],
  highlightIds: [],
  // lineIds: new Map().entries(),
  // prizesInfo: new Map().entries(),
  // prizesState: new Map().entries(),
  // gridsState: new Map().entries(),
};

export const bingoSlice = createSlice({
  name: 'bingo',
  initialState,
  reducers: {
    flip: state => {
      const {flipBalance, flipAmount} = state;
      let bablance = flipBalance - flipAmount;

      if (bablance < 0) {
        bablance = 0;
      }

      state.flipBalance = bablance;
    },
  },
});

export const {flip} = bingoSlice.actions;

export default bingoSlice.reducer;
