import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Alert,
  TextInput,
} from 'react-native';
import BookSearchCard from '../components/BookSearchCard';
import {useNavigation} from '@react-navigation/native';
import colorPallete from '../styles/color';

function SearchScreen({route}) {
  const navigation = useNavigation();
  const [codeQuery, setCodeQuery] = useState<string>(route.params.query);
  const [bookList, setBookList] = useState<any[]>();
  const [textQuery, onChangeTextQuery] = React.useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${codeQuery}&maxResults=30&startIndex=${index}`,
      )
      .then((result) => {
        if (result.data.totalItems) {
          setBookList(result.data);
          setLoading(false);
        } else {
          Alert.alert(
            'Sorry!',
            'We couldn`t find the book with this ISBN, try to search it by title or author',
            [
              {
                text: 'Go back',
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  setLoading(false);
                },
              },
            ],
          );
        }
      })
      .catch((error) => console.log(error));
  }, [codeQuery]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${textQuery}&maxResults=30&startIndex=${index}`,
      )
      .then((result) => {
        if (result.data.totalItems) {
          setCodeQuery('');
          setBookList(result.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [textQuery]);


  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextQuery}
          value={textQuery}
          placeholder="Search by title or author..."
          placeholderTextColor={colorPallete.disabledText}
        />
        {bookList && (textQuery || codeQuery) && (
          <FlatList
            data={bookList?.items}
            renderItem={({item}) => <BookSearchCard bookItem={item} />}
          />
        )}
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
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colorPallete.primary,
    borderRadius: 10,
    padding: 10,
  },
});

export default SearchScreen;
