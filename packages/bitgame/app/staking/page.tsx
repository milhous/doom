import About from './components/about';

const Page = (): JSX.Element => {
  return (
    /* @ts-expect-error Server Component */
    <About />
  );
};

export default Page;
