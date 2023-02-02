import BingoProvider from './BingoProvider';
import BingoLogo from './BingoLogo';
import BingoAstrolabe from './BingoAstrolabe';
import BingoGrids from './BingoGrids';
import BingoBtnFlip from './BingoBtnFlip';

import './index.scss';

const Bingo = () => {
  return (
    <BingoProvider>
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
            <div className="bingo-game_grids">
              <BingoGrids />
            </div>
          </div>
          <BingoBtnFlip />
          {/* <BingoBtnFlip />
      <Time /> */}
        </section>
      </main>
    </BingoProvider>
  );
};

export default Bingo;
