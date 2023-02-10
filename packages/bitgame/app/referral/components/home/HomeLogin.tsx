import {Trans} from 'react-i18next/TransWithoutContext';
import Image from 'next/image';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import {getInvitationInfo} from '@referral/api';
import Assets from '@referral/assets';

import HomeLoginBtn from './HomeLoginBtn';
import './HomeLogin.scss';

async function getData() {
  const res = await getInvitationInfo();

  return res;
}

// 登录
const HomeLogin = async (): Promise<JSX.Element> => {
  const {t} = useTranslate(['referral'], PackageType.REFERRAL);

  const data = await getData();

  const {lutPrize = 0, rebateLimit = 0} = data;

  return (
    <section className="referral-login">
      <div>
        <dl>
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
          <dd>
            <HomeLoginBtn>{t('btn_invite')}</HomeLoginBtn>
          </dd>
        </dl>
        <i>
          <Image
            src={Assets.homeLoginElem}
            className="icon-elem"
            width={Assets.homeLoginElem.width}
            height={Assets.homeLoginElem.height}
            alt=""
          />
        </i>
      </div>
    </section>
  );
};

export default HomeLogin;
