import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy!,
    $orderDirection: OrderDirection!,
    $filter: String,
    $first: Int,
    $after: String
  ){
  repositories (
    orderBy: $orderBy
    orderDirection: $orderDirection
    searchKeyword: $filter
    first: $first
    after: $after
  ) {
    edges {
      node {
        ownerAvatarUrl
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean!){
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query getById($id: ID!){
    repository(id: $id) {
      id
      fullName
      url
    }
  }
`;

export const GET_REVIEWS_BY_ID = gql`
query getReviews($id: ID!, $first: Int, $after: String){
  repository(id: $id) {
    id
    fullName
    description
    ownerAvatarUrl
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    reviews (first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;