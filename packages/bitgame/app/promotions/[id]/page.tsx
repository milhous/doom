import {getActivityInfo, IActivityData} from '@promotions/api';

import Detail from '@promotions/components/detail';

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
  const data = await getData();

  return (
    <main id="promotions" className="promotions-detail">
      {/* @ts-expect-error Server Component */}
      <Detail data={data[0]} />
    </main>
  );
};

export default Page;
