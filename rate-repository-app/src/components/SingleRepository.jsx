import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';
import useReviews from '../hooks/useReviews';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10
  },
  separator: {
    height: 10,
  },
  header: {
    marginBottom: 10
  },
  rating: {
    borderWidth: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderColor: theme.colors.primary
  },
  ratingNumber: {
    color: theme.colors.primary
  },
  textView: {
    width: 340
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository, id }) => {
  const [getUrl, result] = useLazyQuery(GET_REPOSITORY_BY_ID);

  useEffect(() => {
    getUrl({variables: {id: id}});
  },[]);

  if(!result.data || !repository) {
    return <Text>loading...</Text>;
  }

  const handlePress = () => {
    Linking.openURL(result.data.repository.url);
  };

  return <View style={styles.header}><RepositoryItem showLink={true} handlePress={handlePress} repository={repository}/></View>;
};

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingNumber}>{review.rating}</Text>
      </View>
      <View style={styles.textView}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary'>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};


const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useReviews(id, 15);

  const reviews = repository ?
    repository.reviews.edges.map(e => e.node) : [];

  const onEndReach = () => {
    fetchMore();
  };
  
  return (
    <>
      <RepositoryInfo
        repository={repository}
        id={id}
      />
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item}/>}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponentStyle={styles.header}
        onEndReached={onEndReach()}
      />
    </>
  );
};

export default SingleRepository;
