import {Suspense} from 'react';
import dynamic from 'next/dynamic';

import BingoProvider from './BingoProvider';
import BingoLogo from './BingoLogo';
import BingoAstrolabe from './BingoAstrolabe';
import BingoGrids from './BingoGrids';
import BingoReceive from './BingoReceive';

const BingoBtnFlip = dynamic(() => import('./BingoBtnFlip'), {ssr: false});

import './index.scss';

const Bingo = () => {
  return (
    <BingoProvider>
      <main id="game" className="game-bingo">
        <section className="bingo-container">
          <div className="bingo-header">
            <BingoReceive />
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
          <Suspense>
            <BingoBtnFlip />
          </Suspense>
          {/*
      <Time /> */}
        </section>
      </main>
    </BingoProvider>
  );
};

export default Bingo;
