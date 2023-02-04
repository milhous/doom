import {gridX, gridY, gridPrizeConfig} from '@game/config/bingo';

// 翻牌网格
let gridsFlipIds = [];
// 奖励网格
const gridPrizeIds: Map<number, number[]> = new Map();

// 初始化翻牌ID
const initGridsFlipIdxs = () => {
  const nums = 5 * 5;

  for (let i = 1; i <= nums; i++) {
    gridsFlipIds.push(i);
  }
};

initGridsFlipIdxs();

// 初始化奖励ID
const initGridsPrizeIdxs = () => {
  for (const pid in gridPrizeConfig) {
    const data = gridPrizeConfig[pid];

    gridPrizeIds.set(Number(pid), data);
  }
};

initGridsPrizeIdxs();

/**
 * 随机排序（洗牌算法）
 * @param {array} data 数据
 * @return {array} result
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

// 获取奖励ID
const getPrizeIds = (gridId: number): number[] => {
  const res = [];

  for (const [pid, data] of gridPrizeIds.entries()) {
    const filter = data.filter(value => value !== gridId);

    if (filter.length) {
      gridPrizeIds.set(pid, filter);
    } else {
      res.push(pid);

      gridPrizeIds.delete(pid);
    }
  }

  return res;
};

/**
 * 声明
 * @param {number} gridId 翻开的格子编号(必定返回)
 * @param {number[]} prizeIds 触发的奖励(满足触发条件才返回) pid = prizeNo
 */
export interface IBingoFlipData {
  gridId: number;
  prizeIds?: number[];
}

// Bingo 翻牌
export function apiBingoFlip(): IBingoFlipData {
  gridsFlipIds = shuffle(gridsFlipIds);
  const gridId = gridsFlipIds.shift();
  const prizeIds = getPrizeIds(gridId);

  if (gridPrizeIds.size === 0 && gridsFlipIds.length === 0) {
    initGridsFlipIdxs();

    initGridsPrizeIdxs();
  }

  return {gridId, prizeIds};
}
