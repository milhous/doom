import {setLocalesPath} from '@libs/i18n/server';
import Home from '@referral/components/home';

import './theme.scss';

setLocalesPath('referral');

export default function Page() {
  return <Home />;
}
