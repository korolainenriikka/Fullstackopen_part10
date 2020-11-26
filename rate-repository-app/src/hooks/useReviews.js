import { useQuery } from '@apollo/react-hooks';

import { GET_REVIEWS_BY_ID } from '../graphql/queries';

const useReviews = (id, first) => {
  const variables = {id: id, first: first};
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS_BY_ID,
    {variables: variables}
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REVIEWS_BY_ID,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            }
          },
        };

        return nextResult;
      },
    });
  };


  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
