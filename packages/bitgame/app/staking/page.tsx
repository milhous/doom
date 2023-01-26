import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';

import About from './components/about';

const Page = async (): Promise<JSX.Element> => {
  return (
    <>
      <Toolbar />
      {/* @ts-expect-error Server Component */}
      <Header />
      {/* @ts-expect-error Server Component */}
      <About />
      <Footer />
    </>
  );
};

export default Page;
