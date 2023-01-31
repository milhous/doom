import AboutBanner from './AboutBanner';
import AboutInfo from './AboutInfo';
import AboutBurning from './AboutBurning';
import AboutUsage from './AboutUsage';
import AboutRoadmap from './AboutRoadmap';
import AboutContact from './AboutContact';

import './index.scss';

// 获取LUT信息
const getLutInfo = async () => {
  //const res: ILutInfoResponse = await apiLutInfo();

  return {
    ownerNumber: 100,
    miningPoolTotal: 10000,
    miningMaxPool: 1000000000,
    totalBurning: 1000,
  };
};

const About = async (): Promise<JSX.Element> => {
  const res = await getLutInfo();

  return (
    <main id="staking" className="staking-about">
      <AboutBanner />
      <AboutInfo info={res} />
      <AboutBurning info={res} />
      <AboutUsage />
      <AboutRoadmap />
      <AboutContact />
    </main>
  );
};

export default About;
