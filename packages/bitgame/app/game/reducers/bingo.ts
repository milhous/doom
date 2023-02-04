import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {gridPrizeConfig, gridLinesConfig} from '@game/config/bingo';

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
 * @param {IBingoGridsState} flipGridsState 翻牌状态
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
  lineIds: [number, number[]][];
  // prizesInfo: IterableIterator<[number, IBingoInfoPrize]>;
  prizeGridsState: IBingoPrizeGridsState;
  flipGridsState: IBingoFlipGridsState;
}

// 声明 - 奖励状态
type IBingoPrizeGridsState = [number, number][];

// 声明 - 翻牌状态
type IBingoFlipGridsState = [number, boolean][];

/**
 * 随机排序（洗牌算法）
 * @param {Array<number>} data 数据
 * @return {Array<number>} result
 */
const shuffle = (data: number[]): number[] => {
  const arr = Array.from(data);
  const len = data.length;

  for (let i = len - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * (i + 1));
    const item = arr[index];

    arr[index] = arr[i];
    arr[i] = item;
  }

  return arr;
};

// 初始化翻牌网格状态
const initFlipsState = () => {
  const states: Map<number, boolean> = new Map();

  for (let i = 1; i <= 25; i++) {
    states.set(i, false);
  }

  return [...states];
};

// 初始化奖励网格状态
const initPrizesState = () => {
  const states: Map<number, number> = new Map();

  for (const pid in gridPrizeConfig) {
    states.set(Number(pid), 0);
  }

  return [...states];
};

// 更新翻牌状态
const updateFlipsState = (gridId: number, gridsState: IBingoFlipGridsState): IBingoFlipGridsState => {
  const states = new Map(gridsState);

  if (states.has(gridId)) {
    states.set(gridId, true);
  }

  return [...states];
};

// 更新奖励状态
const updatePrizesState = (prizeIds: number[], gridsState: IBingoPrizeGridsState): IBingoPrizeGridsState => {
  const states = new Map(gridsState);

  if (Array.isArray(prizeIds) && prizeIds.length) {
    for (const pid of prizeIds) {
      states.set(pid, 1);
    }
  }

  return [...states];
};

// 重置翻牌状态
const resetFlipsState = (gridsState: IBingoFlipGridsState): IBingoFlipGridsState => {
  const states = new Map(gridsState);

  for (const gridId of states.keys()) {
    states.set(gridId, false);
  }

  return [...states];
};

// 重置奖励状态
const resetPrizesState = (gridsState: IBingoPrizeGridsState): IBingoPrizeGridsState => {
  const states = new Map(gridsState);

  for (const prizeId of states.keys()) {
    states.set(prizeId, 0);
  }

  return [...states];
};

// 获取过渡动画网格ID
const getTransitionIds = (gridId: number, gridsState: IBingoFlipGridsState): number[] => {
  const states = new Map(gridsState);
  const ids = shuffle([...states.keys()]);

  ids.push(gridId);

  return ids;
};

// 判断本轮翻盘是否结束
const checkComplete = (gridsState: IBingoPrizeGridsState): boolean => {
  const states = new Map(gridsState);
  let counter = 0;
  for (const state of states.values()) {
    // 领取状态：0未触发 1待领取 2已领取
    if (state !== 0) {
      counter++;
    }
  }
  return counter >= states.size - 1;
};

/**
 * 检测高亮
 * @param {Array<number>} data 数据
 * @return {Array<number>}
 */
const detectHighlight = (prizeIds: number[]): {highlightIds: number[]; lineIds: [number, number[]][]} => {
  let highlightIds: number[] = [];
  const lineIds: Map<number, number[]> = new Map();

  if (Array.isArray(prizeIds)) {
    for (const pid of prizeIds) {
      if (Array.isArray(gridPrizeConfig[pid])) {
        highlightIds = highlightIds.concat(gridPrizeConfig[pid]);
      }

      if (Array.isArray(gridLinesConfig[pid])) {
        const [gid, type] = gridLinesConfig[pid];
        const types = lineIds.has(gid) ? Array.from(lineIds.get(gid) as number[]) : [];

        types.push(type);

        lineIds.set(gid, types);
      }
    }
  }

  return {
    highlightIds: [...new Set(highlightIds)],
    lineIds: [...lineIds],
  };
};

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
  lineIds: [],
  // prizesInfo: new Map().entries(),
  prizeGridsState: initPrizesState(),
  flipGridsState: initFlipsState(),
};

export const bingoSlice = createSlice({
  name: 'bingo',
  initialState,
  reducers: {
    flip: (state, action) => {
      const {payload} = action;
      const {flipBalance, flipAmount} = state;

      const flipGridsState = updateFlipsState(payload.gridId, state.flipGridsState);
      const prizeGridsState = updatePrizesState(payload.prizeIds, state.prizeGridsState);
      const isComplete = checkComplete(prizeGridsState);
      const transitionIds = getTransitionIds(payload.gridId, flipGridsState);
      const {highlightIds, lineIds} = detectHighlight(payload.prizeIds);

      state.flipGridsState = flipGridsState;
      state.prizeGridsState = prizeGridsState;
      state.isComplete = isComplete;
      state.transitionIds = transitionIds;
      state.highlightIds = highlightIds;
      state.lineIds = lineIds;

      // 更新余额
      let bablance = flipBalance - flipAmount;

      if (bablance < 0) {
        bablance = 0;
      }

      state.flipBalance = bablance;
    },
    transition: state => {
      const transitionIds = Array.from(state.transitionIds);

      transitionIds.shift();

      state.transitionIds = transitionIds;
    },
    receive: (state, action) => {
      const {payload} = action;
      const states = new Map(state.prizeGridsState);

      if (states.has(payload.pid)) {
        states.set(payload.pid, 2);
      }

      state.prizeGridsState = [...states];
    },
    reset: state => {
      const flipGridsState = resetFlipsState(state.flipGridsState);
      const prizeGridsState = resetPrizesState(state.prizeGridsState);

      state.flipGridsState = flipGridsState;
      state.prizeGridsState = prizeGridsState;
      state.isComplete = false;
    },
  },
});

export const {flip, transition, receive, reset} = bingoSlice.actions;

export default bingoSlice.reducer;
