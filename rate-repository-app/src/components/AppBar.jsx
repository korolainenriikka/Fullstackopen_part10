import React, { useContext, useEffect, forceUpdate } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../context/AuthStorageContext';

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
  // eslint-disable-next-line no-unused-vars
  const { data, error, loading } = useQuery(AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const renderSignInSignOut = () => {
    if (!loading || !data || !data.authorizedUser){
      return (
        <AppBarTab
            name='Sign in'
            link="/signin"
          />
      );
    } else {
      return (
        <AppBarTab
            name='Sign out'
            link=""
            onClick={() => handleSignOut()}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          name='Repositories'
          link="/"
        />
        {renderSignInSignOut()}
      </ScrollView>
    </View>
  );  
};

export default AppBar;