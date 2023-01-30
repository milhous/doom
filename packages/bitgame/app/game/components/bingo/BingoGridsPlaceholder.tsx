import {gridX, gridY, gridDisabledIdxs, gridPrizeIdxs} from '@game/config/bingo';

import BingoGridsItem from './BingoGridsItem';

import './BingoGridsList.scss';

// 网格占位
const BingoGridsPlaceholder = (): JSX.Element => {
  const items = [];

  for (let i = 0; i < gridX * gridY; i++) {
    if (gridDisabledIdxs.indexOf(i) > -1) {
      items.push(<BingoGridsItem state="disabled" key={i} />);
    } else if (gridPrizeIdxs.indexOf(i) > -1) {
      items.push(<BingoGridsItem state="prize" key={i} />);
    } else {
      items.push(<BingoGridsItem state="flip" key={i} />);
    }
  }

  return <ul className="bingo-grids_list">{items}</ul>;
};

export default BingoGridsPlaceholder;
