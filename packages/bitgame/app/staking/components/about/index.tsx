import AboutBanner from './AboutBanner';
import AboutBurning from './AboutBurning';
import AboutUsage from './AboutUsage';
import AboutRoadmap from './AboutRoadmap';
import AboutContact from './AboutContact';

import './index.scss';

// 获取LUT信息
const getLutInfo = async () => {
  //const res: ILutInfoResponse = await apiLutInfo();

  return {
    totalBurning: 1000,
  };
};

const About = async (): Promise<JSX.Element> => {
  const res = await getLutInfo();

  return (
    <main id="staking" className="staking-about">
      {/* @ts-expect-error Server Component */}
      <AboutBanner />
      {/* @ts-expect-error Server Component */}
      <AboutBurning info={res} />
      {/* @ts-expect-error Server Component */}
      <AboutUsage />
      {/* @ts-expect-error Server Component */}
      <AboutRoadmap />
      {/* @ts-expect-error Server Component */}
      <AboutContact />
    </main>
  );
};

export default About;
