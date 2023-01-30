import {gridX, gridY, gridDisabledIdxs, gridPrizeIdxs, gridSignConfig} from '@game/config/bingo';

import './BingoGridsItem.scss';

// 网格元素
const BingoGridsItem = (props: {state: string}) => {
  return <li className={`bingo-grids_item ${props.state}`}></li>;
};

export default BingoGridsItem;
