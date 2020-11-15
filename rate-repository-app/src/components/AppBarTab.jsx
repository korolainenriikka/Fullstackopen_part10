import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  link: {
    color: '#FFFFFF',
    margin: 4
  },
});

const AppBarTab = ({ name, link }) => {
  return (
    <Link to={link} component={TouchableOpacity}>
      <Text style={styles.link}>{name}</Text>
    </Link>
  );
};

export default AppBarTab;