import CompLogo from './components/CompLogo';
import CompNav from './components/CompNav';
import CompButtons from './components/CompButtons';

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
          <CompButtons />
        </article>
      </section>
    </header>
  );
};

export default UIHeader;
