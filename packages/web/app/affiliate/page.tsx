import {setLocalesPath} from '@libs/i18n/server';
import Home from '@affiliate/components/home';

import './theme.scss';

setLocalesPath('affiliate');

export default function Page() {
  return <Home />;
}
