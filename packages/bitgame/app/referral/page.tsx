import { setAppname } from '@libs/i18n/server';
import Toolbar from '@ui/toolbar';
import Header from '@ui/header';

import Home from './components/home';

import './theme.scss';

const Page = async (): Promise<JSX.Element> => {
  setAppname('referral');

  return <>
    <Toolbar />
    {/* @ts-expect-error Server Component */}
    <Header />
    <Home />
  </>;
}

export default Page;
