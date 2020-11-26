import React from 'react';
import { View } from 'react-native';
import Text from './Text';

const RatingTag = ({ name, value }) => {
  const abbreviatedValue = value < 1000 ?
    value : `${Math.round(value/1000 * 10) / 10}k`;

  return (
    <View style={{alignContent: "center"}}>
      <Text fontWeight="bold" testID={name}>{abbreviatedValue}</Text>
      <Text color="textSecondary">{name}</Text>
    </View>
  );
};

export default RatingTag;