import Toolbar from '@ui/toolbar';
import Header from '@ui/header';
import Footer from '@ui/footer';

const Page = async (): Promise<JSX.Element> => {
  return (
    <>
      <Toolbar />
      {/* @ts-expect-error Server Component */}
      <Header />
      <main>home</main>
      <Footer />
    </>
  );
};

export default Page;
