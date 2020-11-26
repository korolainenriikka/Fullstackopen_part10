import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

import { useHistory } from 'react-router-native';

const useNewRepository = () => {
  const history = useHistory();

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (e) => {
      console.log(`error submitting: ${e}`);
    }
  });

  const createNew = async ({ ownerName, repositoryName, rating, text }) => {
    await mutate({ variables: { ownerName, repositoryName, rating, text}});

    if (result.data) {
      history.push(`/repository/${result.data.createReview.repositoryId}`);
    }
  };

  return [ createNew, result ];
};

export default useNewRepository;
