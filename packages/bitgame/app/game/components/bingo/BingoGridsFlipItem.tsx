import Image from 'next/image';

import Assets from '@game/assets';

import './BingoGridsItem.scss';
import './BingoGridsFlipItem.scss';

/**
 * 翻牌网格
 * @param {number} index 索引值
 * @param {number} gid 翻牌ID(等同于gridNo)
 */
const BingoGridsFlipItem = (props: {index: number; gid: number}): JSX.Element => {
  const {index, gid} = props;

  const classname = 'bingo-grids_item flip';
  const zIndex = 1;
  const flipPic = '11';

  return (
    <li className={classname} data-index={index} style={{zIndex: zIndex}}>
      <div className="bingo-flip" data-gid={gid}>
        <div>
          <i></i>
        </div>
      </div>
    </li>
  );
};

export default BingoGridsFlipItem;
