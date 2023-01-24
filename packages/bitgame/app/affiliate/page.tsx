import {setAppname} from '@libs/i18n/server';
import Home from '@affiliate/components/home';

import './theme.scss';

export default function Page() {
  setAppname('affiliate');

  return <Home />;
}
