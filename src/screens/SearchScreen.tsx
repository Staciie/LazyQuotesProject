import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList, View} from 'react-native';
import BookSearchCard from '../components/BookSearchCard';

function SearchScreen({route}) {
  const [query, setQuery] = useState<string>(route.params.query);
  const [bookList, setBookList] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30&startIndex=${index}`,
      )
      .then((result) => {
        setBookList(result.data);
        setLoading(false);
        // const dataToSend = processFetchedBookData(result);
        // postBook(uid, dataToSend);
      })
      .catch((error) => console.log(error));
  }, [query]);

  if (!loading) {
    console.log(bookList.items[0]);
  }
  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <FlatList
          data={bookList.items}
          renderItem={({item}) => <BookSearchCard bookItem={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
});

export default SearchScreen;
