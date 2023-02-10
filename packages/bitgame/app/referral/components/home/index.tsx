import HomeBanner from './HomeBanner';
import HomeLogin from './HomeLogin';
import HomeHow from './HomeHow';
import HomeJoin from './HomeJoin';
import HomeFaq from './HomeFaq';

import Web3ActivatedWrap from '@web3/components/Web3ActivatedWrap';
import Web3UnactivatedWrap from '@web3/components/Web3UnactivatedWrap';

const Home = () => {
  return (
    <main id="referral" className="referral-home">
      <Web3ActivatedWrap>
        {/* @ts-expect-error Server Component */}
        <HomeBanner />
      </Web3ActivatedWrap>
      <Web3UnactivatedWrap>
        {/* @ts-expect-error Server Component */}
        <HomeLogin />
      </Web3UnactivatedWrap>
      {/* @ts-expect-error Server Component */}
      <HomeHow />
      <HomeJoin />
      {/* @ts-expect-error Server Component */}
      <HomeFaq />
    </main>
  );
};

export default Home;
