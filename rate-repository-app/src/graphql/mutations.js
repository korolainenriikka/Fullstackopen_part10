import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation auth($username: String!, $password: String!){
    authorize(
      credentials: {
        username: $username,
        password: $password
      }
    ) {accessToken}
  }
`;
