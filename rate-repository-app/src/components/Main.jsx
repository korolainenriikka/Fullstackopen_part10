import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryListContainer from './RepositoryListContainer';
import SingleRepository from './SingleRepository';
import NewRepository from './NewRepository';
import MyReviews from './MyReviews';

import theme from '../theme';
import SignIn from './SignIn';
import SignUp from './SignUp';

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import useNewRepository from '../hooks/useNewRepository';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const [createNew] = useNewRepository();

  const onSignInSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const onSignUpSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const onNewRepoSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const ratingAsNumber = Number(rating);

    try {
      await createNew ({ ownerName, repositoryName, rating: ratingAsNumber, text });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryListContainer />
        </Route>
        <Route path="/signin" exact>
          <SignIn onSubmit={onSignInSubmit}/>
        </Route>
        <Route path="/signup" exact>
          <SignUp onSubmit={onSignUpSubmit}/>
        </Route>
        <Route path="/repository/:id" exact>
          <SingleRepository />
        </Route>
        <Route path="/createrepo" exact>
          <NewRepository onSubmit={onNewRepoSubmit}/>
        </Route>
        <Route path="/myreviews" exact>
          <MyReviews />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;