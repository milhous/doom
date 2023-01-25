'use client';

import {PackageType} from '@libs/config';
import {useTranslate} from '@libs/i18n/client';
// import analytics from '@libs/analytics';
import {copy, share} from '@libs/utils';

import {toast, error} from '@widget/toastify';

/**
 * 获取分享链接
 * @param {string} code 分享码
 * @returns {string}
 */
const getLink = (code: string): string => {
  const link = typeof location !== 'undefined' ? `${location.origin}/?invite=${code}` : '';

  return link;
};

/**
 * 声明
 * @param {string} type 类型
 * @param {string} inviteCode 邀请码
 * @param {React.ReactNode} children ReactNode
 */
interface IBannerBtnShareProps {
  type: string;
  inviteCode: string;
  children?: React.ReactNode;
}

// 分享按钮
export const BannerBtnShare = (props: IBannerBtnShareProps): JSX.Element => {
  const {type, inviteCode, children} = props;
  const {t} = useTranslate(['referral', 'common'], PackageType.REFERRAL);
  const link = getLink(inviteCode);

  /**
   * 分享
   * @param {string} type 分享类型 facebook, twitter, telegram
   */
  const handleShare = (type: string): void => {
    // switch (type) {
    //   case 'facebook':
    //     analytics.customEvent('Referral_share_facebook', {
    //       desc: '点击分享至facebook按钮',
    //     });

    //     break;
    //   case 'twitter':
    //     analytics.customEvent('Referral_share_twitter', {
    //       desc: '点击分享至twitter按钮',
    //     });

    //     break;
    //   case 'telegram':
    //     analytics.customEvent('Referral_share_telegram', {
    //       desc: '点击分享至telegram按钮',
    //     });

    //     break;
    // }

    const title = t('share', {inviteCode});

    share(type, {
      title,
      url: link,
    });
  };

  return (
    <button className="btn-share" onClick={() => handleShare(type)}>
      {children}
    </button>
  );
};

/**
 * 声明
 * @param {string} type 类型 0:邀请码，1:邀请链接
 * @param {string} inviteCode 邀请码
 * @param {React.ReactNode} children ReactNode
 */
interface IBannerBtnCopyProps {
  type: string;
  inviteCode: string;
  children?: React.ReactNode;
}

// 复制按钮
export const BannerBtnCopy = (props: IBannerBtnCopyProps): JSX.Element => {
  const {type, inviteCode, children} = props;
  const {t} = useTranslate(['referral', 'common'], PackageType.REFERRAL);

  /**
   * 复制
   * @param {number} type 类型 code:邀请码，link:邀请链接
   */
  const handleCopy = (type: string): void => {
    let str: string;

    if (type === 'code') {
      // analytics.customEvent('Referral_code_copy', {
      //   desc: '点击邀请码复制按钮',
      // });

      str = inviteCode;
    } else {
      // analytics.customEvent('Referral_link_copy', {
      //   desc: '点击邀请链接复制按钮',
      // });

      str = getLink(inviteCode);
    }

    copy(str);

    const tips = t('common:tips_copy_success');

    console.log(tips);

    toast(tips);
  };

  return (
    <button className="btn-copy" onClick={() => handleCopy(type)}>
      {children}
    </button>
  );
};

/**
 * 声明
 * @param {number} inviteNums 邀请链接数量
 * @param {string} inviteLimit 邀请链接数量上限
 * @param {React.ReactNode} children ReactNode
 */
interface IBannerBtnCreateProps {
  inviteNums: number;
  inviteLimit: number;
  children?: React.ReactNode;
}

// 创建按钮
export const BannerBtnCreate = (props: IBannerBtnCreateProps): JSX.Element => {
  const {inviteNums, inviteLimit, children} = props;
  const {t} = useTranslate(['referral', 'common'], PackageType.REFERRAL);

  // 创建
  const handleCreate = () => {
    // analytics.customEvent('Referral_link_setup', {
    //   desc: '点击创建新的邀请链接按钮',
    // });

    if (inviteNums < inviteLimit) {
      // referralCreate.show();
    } else {
      error(t('tips_limit'));
    }
  };

  return <span onClick={handleCreate}>{children}</span>;
};
