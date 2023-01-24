'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import {cookieLngName} from '@app/libs/i18n/settings';

const HomeButton = (): JSX.Element => {
  const router = useRouter();

  const hanldeChange = (lng: string) => {
    Cookies.set(cookieLngName, lng);

    router.refresh();
  };

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
