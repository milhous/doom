import Bingo from './components/bingo';

const Page = (): JSX.Element => {
  return (
    // /* @ts-expect-error Server Component */
    <Bingo />
  );
};

export default Page;
