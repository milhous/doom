'use client';

import {useEffect} from 'react';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
import {useThrottle} from '@libs/hooks';
import WidgetSvga from '@widget/svga';

import Assets from '@game/assets';

import './BingoAstrolabeAward.scss';

/**
 * 大奖
 * @param {number} pid 奖励ID
 */
const BingoAstrolabeAward = (props: {pid: number}): JSX.Element => {
  const {t} = useTranslate(['bingo', 'error'], PackageType.GAME);
  const {pid} = props;

  // 类型
  // const [classname, setClassname] = useState<string>('astrolabe-award');
  const classname = 'astrolabe-award';

  //   useEffect(() => {
  //     if (prizeState === 1) {
  //       setClassname('astrolabe-award active');
  //     } else {
  //       setClassname('astrolabe-award');
  //     }
  //   }, [prizeState]);

  // 领取奖励
  const handleReceive = useThrottle(async (): Promise<void> => {
    // if (prizeState !== 1) {
    //   return;
    // }
    // if (!isLogin) {
    //   acct.login();
    //   return;
    // }
    // try {
    //   const {data} = await apiBingoPrize({
    //     prizeId,
    //     actId,
    //   });
    //   dispatch({type: BingoEventType.RECEIVE, payload: data});
    //   show(prizeCurrency, prizeAmount);
    //   // 如果是当前消耗币种，则更新余额
    //   if (prizeCurrency === flipCurrency) {
    //     acct.updateUserAssets();
    //   }
    //   window.dispatchEvent(new CustomEvent(BingoEventType.RESET));
    // } catch (err) {
    //   error(t('error:error_' + err));
    // }
  });

  return (
    <div className={classname} onClick={handleReceive}>
      <WidgetSvga className="astrolabe-award_halo" url={Assets.currencyHaloAstrolabe} />
      <i className="astrolabe-award_icon"></i>
      <i className="astrolabe-award_stars"></i>
    </div>
  );
};

export default BingoAstrolabeAward;
