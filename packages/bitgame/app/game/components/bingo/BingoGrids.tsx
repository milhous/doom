import BingoGridsPlaceholder from './BingoGridsPlaceholder';
import BingoGridsList from './BingoGridsList';

import './BingoGrids.scss';

// 网格
const BingoGrids = () => {
  return (
    <div className="bingo-grids">
      <BingoGridsPlaceholder />
      <BingoGridsList />
    </div>
  );
};

export default BingoGrids;
