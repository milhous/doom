import {Trans} from 'react-i18next/TransWithoutContext';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import Assets from '@referral/assets';
import {getInvitationInfo} from '@app/referral/api';

// import * as referralCreate from './ReferralCreate';
import {BannerBtnCreate, BannerBtnCopy, BannerBtnShare} from './HomeBannerBtn';
import './HomeBanner.scss';

async function getData() {
  const res = await getInvitationInfo();

  return res;
}

const ReferralBanner = async (): Promise<JSX.Element> => {
  const {t} = await useTranslate(['referral', 'common'], PackageType.REFERRAL);

  const data = await getData();
  const {lutPrize, rebateLimit, inviteLimit, inviteCode} = data;

  return (
    <section className="referral-banner">
      <div>
        <dl className="banner-slogan">
          <dt>{t('banner_title')}</dt>
          <dd>
            <Trans
              t={t}
              i18nKey="login_desc"
              values={{
                lutPrize: `<strong>${lutPrize} LUT</strong>`,
                rebateLimit: `<strong>${rebateLimit} USDT</strong>`,
              }}
            />
          </dd>
        </dl>
        <div className="banner-share">
          <div>
            <dl>
              <dt>{t('share_title')}</dt>
              <dd>
                <BannerBtnCreate inviteNums={4} inviteLimit={inviteLimit}>
                  {t('btn_create_new')} +
                </BannerBtnCreate>
              </dd>
            </dl>
            <ul>
              <li>
                <span>{t('invite_code')}</span>
                <strong>{inviteCode}</strong>
                <BannerBtnCopy type="code" inviteCode={inviteCode}>
                  <Assets.HomeIconCopy />
                </BannerBtnCopy>
              </li>
              <li>
                <span>{t('invite_link')}</span>
                {/* <strong>{link}</strong> */}
                <strong>{inviteCode}</strong>
                <BannerBtnCopy type="link" inviteCode={inviteCode}>
                  <Assets.HomeIconCopy />
                </BannerBtnCopy>
              </li>
            </ul>
            <dl>
              <dt>{t('invite_share')}</dt>
              <dd>
                <BannerBtnShare type="telegram" inviteCode={inviteCode}>
                  <Assets.HomeIconTelegram />
                </BannerBtnShare>
                <BannerBtnShare type="twitter" inviteCode={inviteCode}>
                  <Assets.HomeIconTwitter />
                </BannerBtnShare>
                <BannerBtnShare type="facebook" inviteCode={inviteCode}>
                  <Assets.HomeIconFacebook />
                </BannerBtnShare>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
