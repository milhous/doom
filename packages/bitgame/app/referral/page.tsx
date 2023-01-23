import {setLocalesPath} from '@libs/i18n/server';
import Home from '@referral/components/home';

import './theme.scss';

export default function Page() {
  setLocalesPath('referral');

  return <Home />;
}
