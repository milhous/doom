'use client';

import {useSelector} from 'react-redux';

import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import {astrolabeConfig} from '@game/config/bingo';
import {BingoState} from '@game/stores/bingo';

type IBingoData = [number, number][];

/**
 * 星座
 * @param {number} pid 奖励ID
 * @param {number} state 领取状态 0未触发 1待领取 2已领取
 */
const Constellation = (props: {pid: number; state: number}): JSX.Element => {
  const {pid, state} = props;
  // 星座名称
  const astrolabeName = astrolabeConfig['' + pid];

  return (
    state === 2 && (
      <>
        <WidgetSvga url={Assets[astrolabeName + 'Astrolabe']} />
        <WidgetSvga url={Assets[astrolabeName + 'AstrolabeActive']} time={1} />
      </>
    )
  );
};

// 星座
const BingoConstellations = (): JSX.Element => {
  const prizeGridsState = useSelector<BingoState>(state => state.bingo.prizeGridsState) as IBingoData;

  return (
    <>
      {prizeGridsState.map(([pid, state]) => {
        return <Constellation key={pid} pid={pid} state={state} />;
      })}
    </>
  );
};

export default BingoConstellations;
