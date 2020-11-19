import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(GET_REPOSITORIES);
  const [repositories, setRepositories] = useState([]);

  const fetchRepositories =  () => {
    if (data) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
