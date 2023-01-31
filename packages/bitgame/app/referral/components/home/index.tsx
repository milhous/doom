import HomeBanner from './HomeBanner';
// import HomePlan from './HomePlan';
// import HomeCommission from './HomeCommission';
// import HomeSupport from './HomeSupport';
// import HomeRights from './HomeRights';
// import HomeAdvantage from './HomeAdvantage';
import HomeHow from './HomeHow';
import HomeJoin from './HomeJoin';
import HomeFaq from './HomeFaq';

const Home = () => {
  return (
    <main id="referral" className="referral-home">
      {/* @ts-expect-error Server Component */}
      <HomeBanner />
      {/* @ts-expect-error Server Component */}
      <HomeHow />
      <HomeJoin />
      {/* @ts-expect-error Server Component */}
      <HomeFaq />
    </main>
  );
};

export default Home;
