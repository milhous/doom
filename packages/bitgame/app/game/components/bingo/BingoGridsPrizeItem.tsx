import Image from 'next/image';

import Assets from '@game/assets';

import './BingoGridsItem.scss';
import './BingoGridsPrizeItem.scss';

/**
 * 奖励网格
 * @param {number} index 索引值
 * @param {number} pid pid
 * @param {string} pname 名称
 */
const BingoGridsPrizeItem = (props: {index: number; pid: number; pname: string}): JSX.Element => {
  const {index, pid, pname} = props;

  const prizeCurrency = '';
  const prizeAmount = 0;
  // 领取状态 0未触发 1待领取 2已领取
  const prizeState = 0;
  const classname = 'bingo-grids_item prize';

  // switch (prizeState) {
  //   case 0:
  //     classname = 'bingo-grids_item prize';

  //     break;
  //   case 1:
  //     classname = 'bingo-grids_item prize active';

  //     break;
  //   case 2:
  //     classname = 'bingo-grids_item prize received';

  //     break;
  // }

  return (
    <li className={classname} data-index={index}>
      <div className="bingo-prize" data-pid={pid}>
        <i className={`bingo-sign bingo-sign_${pname}`}></i>
        <Image className="bingo-prize_active" src={Assets[pname + 'Grids']} alt="" width={150} height={150} />
        <Image className="bingo-prize_halo" src={Assets.haloPrize} alt="" width={340} height={340} />
      </div>
      <dl className="bingo-tips">
        <dt>
          <Image src={Assets.iconLut} alt="" />
        </dt>
        <dd>
          {prizeCurrency} x{prizeAmount}
        </dd>
      </dl>
    </li>
  );
};

export default BingoGridsPrizeItem;
