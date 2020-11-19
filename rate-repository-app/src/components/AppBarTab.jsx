import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  link: {
    color: '#FFFFFF',
    margin: 4
  },
});

const AppBarTab = ({ name, link, onClick }) => {
  if (onClick) {
    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <Text style={styles.link}>{name}</Text>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <Link to={link} component={TouchableOpacity}>
        <Text style={styles.link}>{name}</Text>
      </Link>
    );
  }
};

export default AppBarTab;