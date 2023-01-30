import Image from 'next/image';

import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';

import './BingoAstrolabe.scss';

const BingoAstrolabe = (): JSX.Element => {
  // 星座
  const elems = [];
  // 大奖ID
  const pid = 0;
  // 大奖名称
  const name = '';
  // 大奖金额
  const amount = 0;
  // 大奖图片
  const img = '';

  return (
    <div className="bingo-astrolabe">
      <WidgetSvga className="astrolabe-background" url={Assets.backgroundAstrolabe} />
      <div className="astrolabe-info">
        <WidgetSvga url={Assets.baseAstrolabe} />
        <dl>
          <dt>{name}</dt>
          <dd>
            <Image src={Assets.iconAward} alt={name} />
            <span>x{amount}</span>
          </dd>
        </dl>
      </div>
      <div className="astrolabe-sign">
        <div className="astrolabe-sign_active">{elems}</div>
        <WidgetSvga className="astrolabe-frame" url={Assets.frameAstrolabe} />
        {/* <Award pid={pid} /> */}
      </div>
    </div>
  );
};

export default BingoAstrolabe;
