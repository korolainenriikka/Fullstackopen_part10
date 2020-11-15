import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBarColor,
    display: "flex",
    flexDirection: "row"
  },
});

const AppBar = () => {
  return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          name='Repositories'
          link="/"
        />
        <AppBarTab
          name='Sign in'
          link="/signin"
        />
      </ScrollView>
    </View>
    );
};

export default AppBar;