import CompNav from './components/CompNav';
import CompPartners from './components/CompPartners';
import CompAssume from './components/CompAssume';
import CompCopyright from './components/CompCopyright';

import './index.scss';

// footer
const UIFooter = (): JSX.Element => {
  return (
    <footer className="ui-footer">
      {/* @ts-expect-error Server Component */}
      <CompNav />
      {/* @ts-expect-error Server Component */}
      <CompPartners />
      <CompAssume />
      {/* @ts-expect-error Server Component */}
      <CompCopyright />
    </footer>
  );
};

export default UIFooter;
