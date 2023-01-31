import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/server';

import WidgetAnalytics from '@widget/analytics';

import './HomeJoin.scss';

const ReferralJoin = (): JSX.Element => {
  const {t} = useTranslate(['referral'], PackageType.REFERRAL);

  return (
    <section className="referral-join">
      <div>
        <dl>
          <dt>{t('join_title')}</dt>
          <dd>{t('join_desc')}</dd>
        </dl>
        <p>
          {t('join_contact')}{' '}
          <a href="mailto:support@bitgame.com" title="support@bitgame.com">
            <WidgetAnalytics eventName="Email_apply" desc="点击邀请页面“立即申请”及“support@bitgame.com">
              support@bitgame.com
            </WidgetAnalytics>
          </a>
        </p>
        <a className="btn-apply" href="mailto:support@bitgame.com" title="support@bitgame.com">
          <WidgetAnalytics eventName="Email_apply" desc="点击邀请页面“立即申请”及“support@bitgame.com">
            {t('btn_apply')}
          </WidgetAnalytics>
        </a>
      </div>
    </section>
  );
};

export default ReferralJoin;
