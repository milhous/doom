import Home from './components/home';

const Page = async (): Promise<JSX.Element> => {
  return (
    /* @ts-expect-error Server Component */
    <Home />
  );
};

export default Page;
