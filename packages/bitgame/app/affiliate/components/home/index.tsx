import HomeBanner from './HomeBanner';
import HomePlan from './HomePlan';
import HomeCommission from './HomeCommission';
import HomeSupport from './HomeSupport';
import HomeRights from './HomeRights';
import HomeAdvantage from './HomeAdvantage';
import HomeHow from './HomeHow';
import HomeFaq from './HomeFaq';

const Home = () => {
  return (
    <main id="affiliate" className="affiliate-home">
      <HomeBanner />
      <HomePlan />
      <HomeCommission />
      <HomeSupport />
      <HomeRights />
      <HomeAdvantage />
      <HomeHow />
      <HomeFaq />
    </main>
  );
};

export default Home;
