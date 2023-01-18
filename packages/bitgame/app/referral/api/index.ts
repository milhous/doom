/**
 * 声明
 * @param {number} firstBet 首笔投注金额（单位：USDT）
 * @param {number} lutPrize 待发放&待领取金额
 * @param {number} betDivisor 下线投注约数（被邀请人投注要求）
 * @param {number} rebateAmount 返利金额（单位：USDT）
 * @param {number} singleLimit 单人限额(单用户提供USDT上限)
 * @param {number} rebateLimit 推广员返利限额（邀请人USDT领取上限）
 * @param {number} flowRate 流水倍率（需满足该值则可提现)
 * @param {number} inviteLimt 邀请链接数量上限
 * @param {number} inviteCode 用户默认邀请码（登录态）
 * @param {IGetInvitationOverviewData} overviewData 概览数据（登录态）
 */
export interface IGetInvitationInfoData {
  firstBet: number;
  lutPrize: number;
  betDivisor: number;
  rebateAmount: number;
  singleLimit: number;
  rebateLimit: number;
  flowRate: number;
  inviteLimt: number;
  inviteCode: string;
}

// 邀请信息
const invitationInfo: IGetInvitationInfoData = {
  firstBet: 1,
  lutPrize: 2,
  betDivisor: 3,
  rebateAmount: 4,
  singleLimit: 5,
  rebateLimit: 6,
  flowRate: 7,
  inviteLimt: 8,
  inviteCode: 'DGGIzkd4',
};

// 邀请基础信息
export const getInvitationInfo = async (): Promise<IGetInvitationInfoData> => {
  return invitationInfo;
};
