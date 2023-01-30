import {gridLetterConfig} from '@game/config/bingo';

import './BingoGridsItem.scss';

/**
 * 禁用网格
 * @param {number} index 索引值
 */
const BingoGridsDisabledItem = (props: {index: number}): JSX.Element => {
  const {index} = props;
  const classname = 'bingo-grids_item disabled';
  // 字母元素
  let letterElem = null;

  if (gridLetterConfig[index]) {
    letterElem = (
      <span className={`bingo-letter bingo-letter_${gridLetterConfig[index]}`}>{gridLetterConfig[index]}</span>
    );
  }

  return (
    <li className={classname} data-index={index}>
      {letterElem}
    </li>
  );
};

export default BingoGridsDisabledItem;
