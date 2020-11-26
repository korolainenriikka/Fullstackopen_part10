import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, filter, first) => {
  let order = 'RATING_AVERAGE';
  let orderDir = 'DESC';

  switch (orderBy) {
    case ('latest'):
        order = 'CREATED_AT';
        orderDir = 'DESC';
      break;
    case ('highest'):
        order = 'RATING_AVERAGE';
        orderDir = 'DESC';
      break;
    case ('lowest'):
        order = 'RATING_AVERAGE';
        orderDir = 'ASC';
      break;
  }

  const variables = {orderBy: order, orderDirection: orderDir, filter: filter, first: first};
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES,
    {variables: variables}
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
