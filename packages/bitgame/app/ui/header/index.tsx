import {Suspense} from 'react';
import dynamic from 'next/dynamic';

import CompLogo from './components/CompLogo';
import CompNav from './components/CompNav';

import './index.scss';

// 钱包
const HeaderWallet = dynamic(() => import('./components/HeaderWallet'), {
  ssr: false,
});

// header
const UIHeader = async (): Promise<JSX.Element> => {
  return (
    <header className="ui-header">
      <section>
        <aside>
          <CompLogo />
        </aside>
        <article>
          <CompNav />
          <Suspense>
            <HeaderWallet />
          </Suspense>
        </article>
      </section>
    </header>
  );
};

export default UIHeader;
