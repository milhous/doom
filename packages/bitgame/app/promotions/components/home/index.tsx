import {HomeProvider} from '@promotions/provider/HomeProvider';

import {getActivityInfo} from '@promotions/api';

import HomeNav from './HomeNav';
import HomeList from './HomeList';
import HomeNothing from './HomeNothing';

import './index.scss';

async function getData() {
  const res = await getActivityInfo();

  return res;
}

const Home = async (): Promise<JSX.Element> => {
  const data = await getData();

  return (
    <main id="promotions" className="promotions-home">
      <HomeProvider>
        {/* @ts-expect-error Server Component */}
        <HomeNav />
        <HomeList data={data}>
          {/* @ts-expect-error Server Component */}
          <HomeNothing />
        </HomeList>
      </HomeProvider>
    </main>
  );
};

export default Home;
