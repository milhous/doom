'use client';

import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';

import {cookieLngName} from '@app/libs/i18n/settings';
import {changeLang} from '@app/libs/i18n/client';

import useSWR from 'swr';

const fetcher = (query: string) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Milhous',
    },
    body: JSON.stringify({query}),
  })
    .then(res => res.json())
    .then(json => json.data);

type Data = {
  users: {
    name: string;
  }[];
};

const HomeButton = (): JSX.Element => {
  const router = useRouter();

  const hanldeChange = (lng: string) => {
    changeLang(lng);

    Cookies.set(cookieLngName, lng);
    router.refresh();
  };

  useSWR<Data>('{ users { name } }', fetcher);

  return (
    <>
      <button
        style={{color: '#fff', fontSize: '.4rem', marginRight: '.4rem'}}
        onClick={() => {
          hanldeChange('en');
        }}
      >
        en
      </button>
      <button
        style={{color: '#fff', fontSize: '.4rem', marginRight: '.4rem'}}
        onClick={() => {
          hanldeChange('ja');
        }}
      >
        ja
      </button>
      <button
        style={{color: '#fff', fontSize: '.4rem'}}
        onClick={() => {
          hanldeChange('ko');
        }}
      >
        ko
      </button>
    </>
  );
};

export default HomeButton;
