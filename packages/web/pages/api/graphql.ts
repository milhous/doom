import {createYoga, createSchema} from 'graphql-yoga';
import {gql} from 'graphql-tag';

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String): User
    invitationInfo: InvitationInfo
  }
  type User {
    name: String
    username: String
  }
  type InvitationInfo {
    firstBet: Int
    lutPrize: Int
    betDivisor: Int
    rebateAmount: Int
    singleLimit: Int
    rebateLimit: Int
    flowRate: Int
    inviteLimt: Int
    inviteCode: String
  }
`;

const users = [
  {name: 'Leeroy Jenkins', username: 'leeroy'},
  {name: 'Foo Bar', username: 'foobar'},
];

/**
 * 邀请信息
 * @param {number} firstBet 首笔投注金额（单位：USDT）
 * @param {number} lutPrize 待发放&待领取金额
 * @param {number} betDivisor 下线投注约数（被邀请人投注要求）
 * @param {number} rebateAmount 返利金额（单位：USDT）
 * @param {number} singleLimit 单人限额(单用户提供USDT上限)
 * @param {number} rebateLimit 推广员返利限额（邀请人USDT领取上限）
 * @param {number} flowRate 流水倍率（需满足该值则可提现)
 * @param {number} inviteLimt 邀请链接数量上限
 * @param {number} inviteCode 用户默认邀请码（登录态）
 */
const invitationInfo = {
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

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(parent, {username}) {
      return users.find(user => user.username === username);
    },
    invitationInfo() {
      return invitationInfo;
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
