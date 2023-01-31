import {cache} from 'react';

import {getActivityInfo, IActivityData} from '@promotions/api';

import Detail from '@promotions/components/detail';

const getData = async () => {
  const res = await getActivityInfo();

  return res;
};

const getDetail = cache(async (id: string): Promise<IActivityData> => {
  const data = await getData();
  let res: IActivityData;

  for (const item of data) {
    if (item.id === id) {
      res = item;
    }
  }

  return res;
});

export async function generateStaticParams() {
  const data = await getData();

  return data.map(item => ({
    id: item.id,
  }));
}

const Page = async ({params}: {params: {id: string}}): Promise<JSX.Element> => {
  const {id} = params;
  const data = await getDetail(id);

  return (
    <main id="promotions" className="promotions-detail">
      <Detail data={data} />
    </main>
  );
};

export default Page;
