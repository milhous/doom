'use client';

// import analytics from '@libs/analytics';

/**
 * 声明
 * @param {string} eventName 事件名称
 * @param {string} desc 描述
 * @param {React.ReactNode} children ReactNode
 */
interface IAnalyticsProps {
  eventName: string;
  desc: string;
  children?: React.ReactNode;
}

/**
 * 统计
 * @param {IAnalyticsProps} props
 */
const WidgetAnalytics = (props: IAnalyticsProps): JSX.Element => {
  const {eventName, desc, children} = props;
  // 点击
  const handleClick = () => {
    console.log(eventName, desc);
    // analytics.customEvent('Email_apply', {
    //   desc: '点击邀请页面“立即申请”及“support@bitgame.com”',
    // });
  };

  return <span onClick={handleClick}>{children}</span>;
};

export default WidgetAnalytics;
