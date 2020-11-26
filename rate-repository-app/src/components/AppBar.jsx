import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../context/AuthStorageContext';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBarColor,
    display: "flex",
    flexDirection: "row"
  }
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(AUTHORIZED_USER, {variables: {includeReviews: false}});
  const authorizedUser = data ? data.authorizedUser : undefined;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          name='Repositories'
          link="/"
        />
        {authorizedUser ? (
          <>
            <AppBarTab
              name="Create a review"
              link="/createrepo"
            />
            <AppBarTab
              name="My reviews"
              link="/myreviews"
            />
            <AppBarTab
              name='Sign out'
              link=""
              onClick={() => onSignOut()}
            />
          </>
        ) : (
          <>
            <AppBarTab
              name='Sign in'
              link="/signin"
            />
            <AppBarTab
              name='Sign up'
              link="/signup"
            />
          </>
        )}
      </ScrollView>
    </View>
  );  
};

export default AppBar;