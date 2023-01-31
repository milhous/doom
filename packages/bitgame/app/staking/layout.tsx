import {Suspense} from 'react';

import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';
import WidgetSpinner from '@widget/spinner';

const StakingLayout = async ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Toolbar />
      {/* @ts-expect-error Server Component */}
      <Header />
      <Suspense fallback={<WidgetSpinner />}>{children}</Suspense>
      <Footer />
    </>
  );
};

export default StakingLayout;
