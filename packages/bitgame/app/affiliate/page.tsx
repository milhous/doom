import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';

import Home from './components/home';

import './theme.scss';

const Page = async (): Promise<JSX.Element> => {
  return (
    <>
      <Toolbar />
      {/* @ts-expect-error Server Component */}
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default Page;
