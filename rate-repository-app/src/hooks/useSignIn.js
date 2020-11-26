import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';

import AuthStorageContext from '../context/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: (e) => {
      console.log(`error logging in: ${e}`);
    }
  });

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { username, password }});
    await result.data;
    
    await authStorage.setAccessToken(result.data.authorize.accessToken);
    apolloClient.resetStore();
    history.push('/');
  };

  return [ signIn, result ];
};

export default useSignIn;