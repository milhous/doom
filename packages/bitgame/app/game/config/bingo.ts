/**
 * 事件类型
 * @property INIT 初始化
 * @property RESET 重置
 * @property TRANSITION 过渡
 * @property BALANCE 余额
 * @property FLIP 翻牌
 * @property PRIZE 奖励
 * @property RECEIVE 领奖
 */
const BingoEventType = {
  INIT: 'BINGO_INIT',
  RESET: 'BINGO_RESET',
  TRANSITION: 'BINGO_TRANSITION',
  BALANCE: 'BINGO_BALANCE',
  FLIP: 'BINGO_FLIP',
  PRIZE: 'BINGO_PRIZE',
  RECEIVE: 'BINGO_RECEIVE',
};

// X轴格子数量
const gridX = 7;
// Y轴格子数量
const gridY = 6;
// 禁用格子索引值
const gridDisabledIdxs = [0, 7, 14, 21, 28];
// 奖励格子索引值
const gridPrizeIdxs = [6, 13, 20, 27, 34, 35, 36, 37, 38, 39, 40, 41];
// 连线格子索引值
const gridLinesIdxs = [3, 10, 15, 16, 17, 18, 19, 24, 31];
// 字母格子配置
const gridLetterConfig = {
  '0': 'B',
  '7': 'I',
  '14': 'N',
  '21': 'G',
  '28': 'O',
};
// 星座格子配置
const gridSignConfig = {
  '6': '13@aries',
  '13': '12@taurus',
  '20': '11@gemini',
  '27': '10@cancer',
  '34': '9@leo',
  '35': '2@pisces',
  '36': '3@aquarius',
  '37': '4@capricornus',
  '38': '5@sagittarius',
  '39': '6@scorpio',
  '40': '7@libra',
  '41': '8@virgo',
};
// 奖励关联格子配置 key: pid, value: gid
const gridPrizeConfig = {
  '2': [5, 9, 13, 17, 21],
  '3': [1, 6, 11, 16, 21],
  '4': [2, 7, 12, 17, 22],
  '5': [3, 8, 13, 18, 23],
  '6': [4, 9, 14, 19, 24],
  '7': [5, 10, 15, 20, 25],
  '8': [1, 7, 13, 19, 25],
  '9': [21, 22, 23, 24, 25],
  '10': [16, 17, 18, 19, 20],
  '11': [11, 12, 13, 14, 15],
  '12': [6, 7, 8, 9, 10],
  '13': [1, 2, 3, 4, 5],
};
// 连线格子配置 key: pid, value: [gid, type] type: 0:horizontal(横线), 1:vertical(竖线), 2:slanting(左斜线), 3:slanting(右斜线)
const gridLinesConfig = {
  '2': [13, 2],
  '3': [11, 1],
  '4': [12, 1],
  '5': [13, 1],
  '6': [14, 1],
  '7': [15, 1],
  '8': [13, 3],
  '9': [23, 0],
  '10': [18, 0],
  '11': [13, 0],
  '12': [8, 0],
  '13': [3, 0],
};

// 星座配置
const astrolabeConfig = {
  '13': 'aries',
  '12': 'taurus',
  '11': 'gemini',
  '10': 'cancer',
  '9': 'leo',
  '2': 'pisces',
  '3': 'aquarius',
  '4': 'capricornus',
  '5': 'sagittarius',
  '6': 'scorpio',
  '7': 'libra',
  '8': 'virgo',
};

export {
  BingoEventType,
  gridX,
  gridY,
  gridDisabledIdxs,
  gridPrizeIdxs,
  gridLinesIdxs,
  gridLetterConfig,
  gridSignConfig,
  gridPrizeConfig,
  gridLinesConfig,
  astrolabeConfig,
};
