'use client';

import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import {BingoState} from '@game/stores/bingo';
import {transition} from '@game/reducers/bingo';

import BingoGridsLine from './BingoGridsLine';

import './BingoGridsItem.scss';
import './BingoGridsFlipItem.scss';

interface IBingoData {
  transitionIds: number[];
  flipGridsState: [number, boolean][];
  highlightIds: number[];
  lineIds: [number, number[]][];
}

/**
 * 翻牌网格
 * @param {number} index 索引值
 * @param {number} gid 翻牌ID(等同于gridNo)
 */
const BingoGridsFlipItem = (props: {index: number; gid: number}): JSX.Element => {
  const {index, gid} = props;
  const dispatch = useDispatch();
  const {flipGridsState, transitionIds, highlightIds, lineIds} = useSelector<BingoState>(state => {
    const {flipGridsState, transitionIds, highlightIds, lineIds} = state.bingo;

    return {flipGridsState, transitionIds, highlightIds, lineIds};
  }) as IBingoData;

  // 设置类名
  const [classname, setClassname] = useState<string>('bingo-grids_item flip');
  // 层级
  const [zIndex, setZIndex] = useState<number>(1);
  // 翻牌状态
  const [flipState, setFlipState] = useState<boolean>(false);
  // 是否过渡
  const [isTransition, setTransitionState] = useState<boolean>(false);
  // 是否高亮
  const [isHighlight, setHighlightState] = useState<boolean>(false);
  // 是否连线
  const [isLines, setLinesState] = useState<boolean>(false);

  // 翻牌状态
  useEffect(() => {
    const states = new Map(flipGridsState);

    setFlipState(states.get(gid));
  }, [flipGridsState]);

  // 过渡状态
  useEffect(() => {
    const res: boolean = Array.isArray(transitionIds) && transitionIds.length > 0;

    setTransitionState(res);
  }, [transitionIds]);

  // 高亮状态
  useEffect(() => {
    const res: boolean = Array.isArray(highlightIds) && highlightIds.includes(gid);

    setHighlightState(res);
  }, [highlightIds]);

  // 连线状态
  useEffect(() => {
    const lineIdsMap = new Map(lineIds);
    const res: boolean = lineIdsMap.has(gid) && Array.isArray(lineIdsMap.get(gid));

    setLinesState(res);
  }, [lineIds]);

  // 层级状态
  useEffect(() => {
    if (isLines) {
      setZIndex(2);
    } else {
      setZIndex(1);
    }
  }, [isLines]);

  // 过渡效果
  useEffect(() => {
    if (!Array.isArray(transitionIds) || transitionIds.length === 0) {
      if (!flipState) {
        setClassname('bingo-grids_item flip');
      } else if (!classname.includes('active')) {
        setClassname(classname + ' active');
      }

      return;
    }

    const tid = transitionIds[0];

    if (gid === tid) {
      setClassname(classname + ' transition');

      setTimeout(() => {
        dispatch(transition());
      }, 80);
    } else if (classname.includes(' transition')) {
      setClassname(classname.replace(' transition', ''));
    }
  }, [transitionIds, flipState]);

  // 渲染高亮
  const renderHighlight = useCallback(() => {
    const elems: JSX.Element[] = [];

    if (!isTransition && isHighlight) {
      elems.push(
        <div className="bingo-heighlight" key={'bingo-heighlight_' + gid}>
          <WidgetSvga url={Assets.dotPrize} time={1} />
          <WidgetSvga url={Assets.framePrize} time={1} />
        </div>,
      );
    }

    return elems;
  }, [isTransition, isHighlight]);

  // 渲染连线
  const renderLines = useCallback(() => {
    const elems: JSX.Element[] = [];

    if (!isTransition && isLines) {
      const lineIdsMap = new Map(lineIds);
      const types = lineIdsMap.get(gid) as number[];

      elems.push(<BingoGridsLine key={'bingo-line_' + gid} types={types} />);
    }

    return elems;
  }, [isTransition, isLines]);

  return (
    <li className={classname} data-index={index} style={{zIndex: zIndex}}>
      <div className="bingo-flip" data-gid={gid}>
        <div>
          <i></i>
        </div>
      </div>
      {renderHighlight()}
      {renderLines()}
      {/* {renderHighlight()}
      {renderLines()} */}
    </li>
  );
};

export default BingoGridsFlipItem;
