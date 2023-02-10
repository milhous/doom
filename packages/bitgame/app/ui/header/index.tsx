import CompLogo from './components/CompLogo';
import CompNav from './components/CompNav';
import HeaderWallet from './components/HeaderWallet';

import './index.scss';
// import CompButtons from './components/CompButtons';

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
          <HeaderWallet />
        </article>
      </section>
    </header>
  );
};

export default UIHeader;
