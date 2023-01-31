import CompNav from './components/CompNav';
import CompPartners from './components/CompPartners';
import CompAssume from './components/CompAssume';
import CompCopyright from './components/CompCopyright';

import './index.scss';

// footer
const UIFooter = (): JSX.Element => {
  return (
    <footer className="ui-footer">
      <CompNav />
      <CompPartners />
      <CompAssume />
      <CompCopyright />
    </footer>
  );
};

export default UIFooter;
