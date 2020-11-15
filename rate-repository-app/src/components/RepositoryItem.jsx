import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import LanguageTag from './LanguageTag';
import RatingTag from './RatingTag';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12
  },
  flexContainerTop: {
    display: "flex",
    flexDirection: "row",
  },
  flexContainerVertical: {
    display: "flex",
    flexDirection: "column"
  },
  flexContainerBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
});

const RepositoryItem = ({repository}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainerTop}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.image}/>
        <View style={styles.flexContainerVertical}>
          <Text fontSize="subHeading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <LanguageTag text={repository.language}/>
        </View>
      </View>
      <View style={styles.flexContainerBottom}>
        <RatingTag name={'Stars'} value={repository.stargazersCount}/>
        <RatingTag name={'Forks'} value={repository.forksCount}/>
        <RatingTag name={'Reviews'} value={repository.reviewCount}/>
        <RatingTag name={'Rating'} value={repository.ratingAverage}/>
      </View>
    </View>
  );
};

export default RepositoryItem;
