import {createYoga, createSchema} from 'graphql-yoga';
import {gql} from 'graphql-tag';
import {getInvitationInfo} from '@app/referral/api';

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

const resolvers = {
  Query: {
    users(_, _args, context) {
      // console.log('context', context.request.headers.get('Authorization'));

      return users;
    },
    user(parent, {username}) {
      return users.find(user => user.username === username);
    },
    async invitationInfo() {
      return await getInvitationInfo();
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
