'use client';

import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';
import './BingoGridsLine.scss';

/**
 * 网格连线
 * @param {Array<number>} types 连线类型 0:horizontal(横线), 1:vertical(竖线), 2:slanting(左斜线), 3:slanting(右斜线)
 */
const BingoGridsLine = (props: {types: number[]}): JSX.Element => {
  const {types} = props;
  const elem: JSX.Element[] = [];

  for (const type of types) {
    switch (type) {
      case 0:
        elem.push(<WidgetSvga className="bingo-line_horizontal" key={type} url={Assets.lineHorizontal} time={1} />);

        break;
      case 1:
        elem.push(<WidgetSvga className="bingo-line_vertical" key={type} url={Assets.lineVertical} time={1} />);

        break;
      case 2:
        elem.push(<WidgetSvga className="bingo-line_slanting fixed" key={type} url={Assets.lineSlanting} time={1} />);

        break;
      case 3:
        elem.push(<WidgetSvga className="bingo-line_slanting" key={type} url={Assets.lineSlanting} time={1} />);

        break;
    }
  }

  return <div className="bingo-line">{elem}</div>;
};

export default BingoGridsLine;
