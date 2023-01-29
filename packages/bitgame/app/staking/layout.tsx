import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';

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
      {children}
      <Footer />
    </>
  );
};

export default StakingLayout;
