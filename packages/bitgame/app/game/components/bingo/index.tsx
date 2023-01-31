import BingoLogo from './BingoLogo';
import BingoAstrolabe from './BingoAstrolabe';
import BingoGrids from './BingoGrids';

import './index.scss';

const Bingo = () => {
  return (
    <main id="game" className="game-bingo">
      <section className="bingo-container">
        <div className="bingo-header">
          {/* <Receive /> */}
          <BingoLogo />
        </div>
        <div className="bingo-game">
          <BingoLogo />
          <div className="bingo-game_astrolabe">
            <BingoAstrolabe />
          </div>
          <div className="bingo-game_grids">{/* <BingoGrids /> */}</div>
        </div>
        {/* <BtnFlip />
      <Time /> */}
      </section>
    </main>
  );
};

export default Bingo;
