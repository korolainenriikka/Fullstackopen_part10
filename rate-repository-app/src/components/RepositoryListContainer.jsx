import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    margin: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = ({ setOrderBy, searchInput, setSearchInput }) => {
  const onChangeSearch = query => setSearchInput(query);

  return (
    <View style={styles.header}>
      <Searchbar
        placeholder='filter repositories'
        onChangeText={onChangeSearch}
        value={searchInput}
      />
      <FilterPicker setOrderBy={setOrderBy}/>
    </View>
  );
};

const FilterPicker = ({ setOrderBy }) => (
  <RNPickerSelect
    onValueChange={(value) => setOrderBy(value)}
    items={[
        { label: 'Latest repositories (default)', value: 'latest' },
        { label: 'Highest rated repositories', value: 'highest' },
        { label: 'Lowest rated repositories', value: 'lowest' },
    ]}
  />
);

const RepositoryListContainer = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filter] = useDebounce(searchInput, 500);
  const [orderBy, setOrderBy] = useState('latest');
  const { repositories, fetchMore } = useRepositories(orderBy, filter, 20);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => 
          <RepositoryItem showLink={false} repository={item}/>
        }
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent= {
          <ListHeader
            setOrderBy={setOrderBy}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        }
        onEndReached={onEndReach}
      />
  );
};

export default RepositoryListContainer;