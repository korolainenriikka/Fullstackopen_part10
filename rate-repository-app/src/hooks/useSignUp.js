import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useSignUp = () => {
  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (e) => {
      console.log(`error creating user: ${e}`);
    }
  });

  const signUp = async ({ username, password }) => {
    await mutate({ variables: { username, password }});

    alert('User creation successful');
    history.push('/');
  };

  return [ signUp ];
};

export default useSignUp;
