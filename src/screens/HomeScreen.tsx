import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BookSection from '../components/BookSection';
import ScannerButton from '../components/ScannerButton';
import auth from '@react-native-firebase/auth';

const bookData = [
  {
    title: '1984',
    author: 'George Orwell',
    img: 'https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg',
    status: 0,
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg/440px-The_Shining_%281977%29_front_cover%2C_first_edition.jpg',
    status: 1,
  },
  {
    title: 'Murder at the House on the Hill',
    author: 'Victoria Walters',
    img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1625679712i/58510488.jpg',
    status: 1,
  },
  {
    title: 'Murder at the House on the Hill',
    author: 'Victoria Walters',
    img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1625679712i/58510488.jpg',
    status: 1,
  },
];

const BOOK_STATUS = {
  0: 'Currently reading',
  1: 'Have read',
};

function HomeScreen({navigation}) {
  const statuses = Object.values(BOOK_STATUS);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {statuses.map(status => (
          <BookSection status={status} dataList={bookData} />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ScannerButton />
      </View>
      <TouchableOpacity
        onPress={() =>
          auth()
            .signOut()
            .then(() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
              }),
            )
        }>
        <Text>Log out</Text>
      </TouchableOpacity>
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
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default HomeScreen;
