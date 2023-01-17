import HomeBanner from './HomeBanner';
import HomePlan from './HomePlan';
import HomeCommission from './HomeCommission';
import HomeSupport from './HomeSupport';
import HomeRights from './HomeRights';
import HomeAdvantage from './HomeAdvantage';
import HomeHow from './HomeHow';
import HomeFaq from './HomeFaq';
import HomeButton from './HomeButton';

const Home = () => {
  return (
    <main className="affiliate affiliate-home">
      {/* @ts-expect-error Server Component */}
      <HomeBanner />
      {/* @ts-expect-error Server Component */}
      <HomePlan />
      {/* @ts-expect-error Server Component */}
      <HomeCommission />
      {/* @ts-expect-error Server Component */}
      <HomeSupport />
      {/* @ts-expect-error Server Component */}
      <HomeRights />
      {/* @ts-expect-error Server Component */}
      <HomeAdvantage />
      {/* @ts-expect-error Server Component */}
      <HomeHow />
      {/* @ts-expect-error Server Component */}
      <HomeFaq />
      <HomeButton />
    </main>
  );
};

export default Home;
