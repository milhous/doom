import Link from 'next/link';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';
import UILanguages from '@ui/languages';
import UITimezone from '@ui/timezone';

import CompAppQRCode from './CompAppQRCode';
import './CompNav.scss';
import FooterIOS from '../assets/footer-ios.svg';
import FooterAndroid from '../assets/footer-android.svg';
import FooterGoogle from '../assets/footer-google.svg';

// 导航
const CompNav = (): JSX.Element => {
  const {t} = useTranslate(['footer'], PackageType.UI);

  return (
    <div className="ui-footer_nav">
      <section>
        <article>
          <dl>
            <dt>{t('match')}</dt>
            <dd>{t('home')}</dd>
            <dd>{t('live')}</dd>
            <dd>{t('blockSports')}</dd>
            <dd>{t('prediction')}</dd>
          </dl>
          <dl>
            <dt>{t('games')}</dt>
            <dd>{t('all')}</dd>
            <dd>{t('self_study')}</dd>
            <dd>{t('slots')}</dd>
            <dd>{t('table_games')}</dd>
            <dd>{t('live_games')}</dd>
            <dd>{t('virtual_games')}</dd>
          </dl>
          <dl>
            <dt>{t('promotions')}</dt>
            <dd>{t('promotions')}</dd>
            <dd>
              <Link href="/referral">{t('referral')}</Link>
            </dd>
            <dd>
              <Link href="/affiliate">{t('affiliate')}</Link>
            </dd>
          </dl>
          <dl>
            <dt>{t('about_us')}</dt>
            <dd>{t('announcement')}</dd>
            <dd>{t('about_bitgame')}</dd>
            <dd>{t('walkthrough')}</dd>
            <dd>{t('terms_of_use')}</dd>
            <dd>{t('privacy_service')}</dd>
            <dd>{t('token_disclaimer')}</dd>
            <dd>{t('responsible')}</dd>
            <dd>{t('selfTermOfUse')}</dd>
            <dd>{t('support_email')}:service@bitgame.com</dd>
          </dl>
        </article>
        <aside>
          <div className="ui-footer_preferences">
            <h3>{t('preferences')}</h3>
            <ul className="ui-footer_dropdowns">
              <li>
                <UILanguages />
              </li>
              <li>
                <UITimezone />
              </li>
            </ul>
          </div>
          <div className="ui-footer_download">
            <h3>{t('app_download')}</h3>
            <ul className="ui-footer_app">
              <li>
                <FooterIOS />
                <CompAppQRCode />
              </li>
              <li>
                <FooterAndroid />
                <CompAppQRCode />
              </li>
              <li>
                <FooterGoogle />
                <CompAppQRCode />
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CompNav;
