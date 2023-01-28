import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';

import {getActivityInfo, IActivityData} from '@promotions/api';

export const dynamic = 'force-dynamic';

const getData = async () => {
  const res = await getActivityInfo();

  return res;
};

export async function generateStaticParams() {
  const data = await getData();

  return data.map(item => ({
    id: item.id,
  }));
}

const Page = async ({params}: {params: {id: string}}): Promise<JSX.Element> => {
  const {id} = params;

  return (
    <>
      <Toolbar />
      {/* @ts-expect-error Server Component */}
      <Header />
      <h1>My Page {id}</h1>
    </>
  );
};

export default Page;
