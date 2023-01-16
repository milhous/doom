import Link from "next/link";
import Image from 'next/image';

import Assets from './assets';

import HomeBanner from '@app/components/home/HomeBanner';
import HomePlan from '@app/components/home/HomePlan';
import HomeCommission from '@app/components/home/HomeCommission';
import HomeSupport from '@app/components/home/HomeSupport';
import HomeRights from '@app/components/home/HomeRights';
import HomeAdvantage from '@app/components/home/HomeAdvantage';
import HomeHow from '@app/components/home/HomeHow';

export default function Page() {

  return (
    <main className="affiliate affiliate-home">
      {/* @ts-expect-error Server Component */}
      <HomeBanner />
      {/* @ts-expect-error Server Component */}
      <HomePlan />
      {/* @ts-expect-error Server Component */}
      <HomeCommission />
      {/* @ts-expect-error Server Component */}
      <HomeSupport />
      {/* @ts-expect-error Server Component */}
      <HomeRights />
      {/* @ts-expect-error Server Component */}
      <HomeAdvantage />
      {/* @ts-expect-error Server Component */}
      <HomeHow />
      <h1 className="test">Hello, Next.js!!</h1>
      <h3 className="fontGradient">
        <span>Hello world!</span>
        <span>Hello world!</span>
      </h3>
      <Assets.HomeHowIcon1 className="how-icon1" />
      <Image
        className="home-icon1"
        src={Assets.homeCommissionIcon1.src}
        width={98}
        height={96}
        alt="Picture of the author"
        priority
      />
      {/* <img src={Assets.homeCommissionIcon1} className="commission-icon1" /> */}
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}