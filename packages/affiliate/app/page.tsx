import Link from "next/link";
import Image from 'next/image';

import Assets from './assets';

console.log('Assets', Assets.homeCommissionIcon1.src);

export default function Page() {
  return <>
    <h1 className="test">Hello, Next.js!!</h1>
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
  </>;
}