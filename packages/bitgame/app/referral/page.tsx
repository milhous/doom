import {Suspense} from 'react';

import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';
import WidgetSpinner from '@widget/spinner';

import Home from './components/home';

import './theme.scss';

const Page = async (): Promise<JSX.Element> => {
  return (
    <>
      <Toolbar />
      {/* @ts-expect-error Server Component */}
      <Header />
      <Suspense fallback={<WidgetSpinner />}>
        <Home />
      </Suspense>
      <Footer />
    </>
  );
};

export default Page;
