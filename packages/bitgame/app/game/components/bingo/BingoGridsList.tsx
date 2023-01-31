import {gridX, gridY, gridDisabledIdxs, gridPrizeIdxs, gridSignConfig} from '@game/config/bingo';

import BingoGridsDisabledItem from './BingoGridsDisabledItem';
import BingoGridsPrizeItem from './BingoGridsPrizeItem';
import BingoGridsFlipItem from './BingoGridsFlipItem';

import './BingoGridsList.scss';

// 网格列表
const BingoGridsList = (): JSX.Element => {
  const items = [];

  for (let i = 0; i < gridX * gridY; i++) {
    if (gridDisabledIdxs.indexOf(i) > -1) {
      items.push(<BingoGridsDisabledItem key={i} index={i} />);
    } else if (gridPrizeIdxs.indexOf(i) > -1) {
      const [pid, pname] = gridSignConfig[i].split('@');
      items.push(<BingoGridsPrizeItem key={i} index={i} pid={Number(pid)} pname={pname} />);
    } else {
      const gid = i - Math.floor(i / gridX) * 2;
      items.push(<BingoGridsFlipItem key={i} index={i} gid={gid} />);
    }
  }

  return <ul className="bingo-grids_list fixed">{items}</ul>;
};

export default BingoGridsList;
