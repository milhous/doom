import {setAppname} from '@libs/i18n/server';
import Home from '@referral/components/home';

import './theme.scss';

export default function Page() {
  setAppname('referral');

  return <Home />;
}
