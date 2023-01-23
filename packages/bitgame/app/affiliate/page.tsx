import {setLocalesPath} from '@libs/i18n/server';
import Home from '@affiliate/components/home';

import './theme.scss';

export default function Page() {
  setLocalesPath('affiliate');

  return <Home />;
}
