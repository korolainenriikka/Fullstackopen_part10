import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: 3,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 5
  },
});

const LanguageTag = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>{text}</Text>
    </View>
  );
};

export default LanguageTag;