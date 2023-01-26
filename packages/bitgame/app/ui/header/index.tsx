import CompLogo from './components/CompLogo';
import CompNav from './components/CompNav';

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
          {/* @ts-expect-error Server Component */}
          <CompNav />
          {/* 
          <CompButtons /> */}
        </article>
      </section>
    </header>
  );
};

export default UIHeader;
