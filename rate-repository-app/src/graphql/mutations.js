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

export const CREATE_REVIEW = gql`
  mutation createReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
    createReview (
      review: {
        repositoryName: $repositoryName,
        ownerName: $ownerName,
        rating: $rating,
        text: $text
      }
    ){
      id,
      repository {
        ownerName
      },
      repositoryId,
      rating,
      createdAt,
      text
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username:String!, $password: String!){
    createUser(
      user: {
        username: $username,
        password: $password
      }
    ){
      id
      username
    }
  }
`;


export const DELETE_BY_ID = gql`
  mutation deleteReview($id: ID!){
    deleteReview(
      id: $id
    )
  }
`;