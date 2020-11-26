import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from './Text';
import LanguageTag from './LanguageTag';
import RatingTag from './RatingTag';
import Button from './Button';
import { useHistory } from 'react-router-native';

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

const RepositoryItem = ({ showLink, handlePress, repository }) => {
  const history = useHistory();

  const showRepository = () => {
    const id = repository.fullName.replace('/','.');
    history.push(`/repository/${id}`);
  };

  const ItemDetails = () => (
    <>
      <View style={styles.flexContainerTop}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.image}/>
        <View style={styles.flexContainerVertical}>
          <Text fontSize="subHeading" fontWeight="bold" testID='fullName'>
            {repository.fullName}
          </Text>
          <Text color="textSecondary" testID='description'>{repository.description}</Text>
          <LanguageTag text={repository.language} />
        </View>
      </View>
      <View style={styles.flexContainerBottom}>
        <RatingTag name={'Stars'} value={repository.stargazersCount}/>
        <RatingTag name={'Forks'} value={repository.forksCount}/>
        <RatingTag name={'Reviews'} value={repository.reviewCount}/>
        <RatingTag name={'Rating'} value={repository.ratingAverage}/>
      </View>
    </>
  );

  if (showLink) {
    return (
      <View style={styles.container} testID='repositoryItem'>
        <ItemDetails />
        <Button onPress={handlePress}>Show on GitHub</Button>
      </View>
    );
  } else {
    return (
      <TouchableOpacity onPress={showRepository}>
        <View style={styles.container} testID='repositoryItem'>
          <ItemDetails />
        </View>
      </TouchableOpacity>
    );
  }
};

export default RepositoryItem;
