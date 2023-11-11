import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import BookSearchCard from '../components/BookSearchCard';
import {useNavigation} from '@react-navigation/native';
import colorPallete from '../styles/color';
import {useStore} from '../store';
import {observer} from 'mobx-react';

const SearchScreen = observer(() => {
  const navigation = useNavigation();
  const {searchStore} = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(query) => {
            searchStore.performSearch(query, navigation);
          }}
          value={searchStore.searchQuery}
          placeholder="Search by..."
          placeholderTextColor={colorPallete.disabledText}
        />
        {!searchStore.searchQuery ? (
          <Text style={styles.warningMessage}>
            Enter title, author name or ISBN code
          </Text>
        ) : searchStore.totalNumber === 0 ? (
          <Text style={styles.warningMessage}>
            Sorry, nothing matched the query you entered :(
          </Text>
        ) : (
          <FlatList
            data={searchStore.searchResults?.items}
            renderItem={({item}) => <BookSearchCard bookItem={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colorPallete.primary,
    borderRadius: 10,
    padding: 10,
  },
  warningMessage: {
    marginTop: 10,
    fontFamily: 'Quicksand-Bold',
  },
});

export default SearchScreen;
