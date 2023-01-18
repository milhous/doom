// import HomeBanner from './HomeBanner';
// import HomePlan from './HomePlan';
// import HomeCommission from './HomeCommission';
// import HomeSupport from './HomeSupport';
// import HomeRights from './HomeRights';
// import HomeAdvantage from './HomeAdvantage';
import HomeHow from './HomeHow';
import HomeJoin from './HomeJoin';
import HomeFaq from './HomeFaq';
import HomeButton from './HomeButton';

const Home = () => {
  return (
    <main className="referral referral-home">
      {/* @ts-expect-error Server Component */}
      <HomeHow />
      {/* @ts-expect-error Server Component */}
      <HomeJoin />
      {/* @ts-expect-error Server Component */}
      <HomeFaq />
      <HomeButton />
    </main>
  );
};

export default Home;
