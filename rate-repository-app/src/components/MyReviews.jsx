import React from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import { format } from 'date-fns';
import { useHistory } from 'react-router-native';

import Text from './Text';
import Button from './Button';
import theme from '../theme';
import { DELETE_BY_ID } from '../graphql/mutations';

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
  buttons: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly'
  } 
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const [mutate] = useMutation(DELETE_BY_ID);

  const history = useHistory();
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const redirectToRepository = () => {
    history.push(`/repository/${review.repository.id}`);
  };

  const confirmDelete = () => {
    Alert.alert('Delete review',  
      'Are you sure you want to delete this review?',  
      [  
        {text: 'Cancel',  onPress: () => console.log('delete cancelled')},  
        {text: 'delete', onPress: () => deleteReview()},  
      ]
    );
  };

  const deleteReview = async () => {
    await mutate({variables: {id: review.id}});
    history.push('/');
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text style={styles.ratingNumber}>{review.rating}</Text>
        </View>
        <View style={styles.textView}>
          <Text fontWeight='bold'>{review.repository.fullName}</Text>
          <Text color='textSecondary'>{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => redirectToRepository()}>View Repository</Button>
        <Button onPress={() => confirmDelete()}>Delete Review</Button>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data } = useQuery(AUTHORIZED_USER, {variables: {includeReviews: true}});

  let myReviews = data ?
    data.authorizedUser.reviews.edges.map(e => e.node) : [];

  return (
    <FlatList
        data={myReviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponentStyle={styles.header}
      />
  );
};

export default MyReviews;